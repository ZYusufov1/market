import { memo } from 'react';
import { Product } from '../types';
import { add, update } from '../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

function ProductCardBase({ product }: { product: Product }) {
	const dispatch = useAppDispatch();

	const item = useAppSelector(state =>
		state.cart.items.find(i => i.id === product.id)
	);

	return (
		<div className="product">
			<img src={product.image_url} alt={product.title} />

			<div className="title">{product.title}</div>
			<p className="desc">{product.description}</p>
			<p className="price">цена: {product.price}₽</p>

			{!item ? (
				<button className="buy" onClick={() => dispatch(add(product))}>
					купить
				</button>
			) : (
				<div className="qty">
					<button className="decrease" onClick={() => dispatch(update({ id: product.id, qty: item.quantity - 1 }))}>-</button>
					<input
						value={item.quantity}
						className="counter"
						onChange={e =>
							dispatch(update({ id: product.id, qty: +e.target.value || 0 }))
						}
					/>
					<button className="increase" onClick={() => dispatch(update({ id: product.id, qty: item.quantity + 1 }))}>+</button>
				</div>
			)}
		</div>
	);
}

export const ProductCard = memo(ProductCardBase);