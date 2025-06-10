import { useState } from 'react';
import { IMaskInput } from 'react-imask';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPhone, clear } from '../store/cartSlice';
import { useCreateOrderMutation } from '../store/apiSlice';
import Popup from './Popup';
import {CartItem} from "../types";

export default function CartBar() {
	const dispatch = useAppDispatch();
	const { items, phone } = useAppSelector(s => s.cart);
	const totalQty = items.reduce((s: number, i: CartItem) => s + i.quantity, 0);
	const totalSum = items.reduce((s: number, i: CartItem) => s + i.quantity * i.price, 0);
	const [ok, setOk] = useState(false);
	const [err, setErr] = useState(false);

	const [createOrder, { isLoading }] = useCreateOrderMutation();

	const order = async () => {
		const digits = phone.replace(/\D/g, '');
		if (digits.length !== 11) return setErr(true);

		setErr(false);

		try {
			const res = await createOrder({
				phone: digits,
				cart: items.map(({ id, quantity }: CartItem) => ({ id, quantity }))
			}).unwrap();

			if (res.success === 1) {
				setOk(true);
				dispatch(clear());
			} else {
				setErr(true);
			}
		} catch {
			setErr(true);
		}
	};

	return (
		<>
			<div className="cart-bar">
				<div className="title">Добавленные товары — {totalSum}₽</div>

				<div>
					{items.map(i => (
						<>
							<div key={i.id} className="row">
								<span className={"name"}>{i.title}</span>
								<span className={"count"}>x{i.quantity}</span>
								<span>{i.price * i.quantity}₽</span>
							</div>

							<div className="divider"/>
						</>
					))}
				</div>


				<div className={"contact"}>
					<IMaskInput
						mask="+{7} (000) 000-00-00"
						lazy={false}
						value={phone}
						onAccept={(v: string) => dispatch(setPhone(v))}
						className="phone-input"
						style={err ? {border: "1px solid red"} : {}}
					/>

					<button
						disabled={!totalQty || isLoading}
						onClick={order}
						className="order-button"
					>
						{isLoading ? 'отправка...' : 'заказать'}
					</button>
				</div>
			</div>

			{ok && <Popup onClose={() => setOk(false)} />}
		</>
	);
}
