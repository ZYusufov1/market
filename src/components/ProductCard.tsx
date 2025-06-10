import { Product } from '../types';
import { add, update } from '../store/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function ProductCard({ product }: { product: Product }) {
	const dispatch = useAppDispatch();
	const item = useAppSelector(s =>
		s.cart.items.find(i => i.id === product.id));

	return (
		<div className="product">
			{/* ...изображение и текст... */}
			{!item ? (
				<button onClick={() => dispatch(add(product))}>купить</button>
			) : (
				<div className="qty">
					<button onClick={() => dispatch(update({ id: product.id, qty: item.quantity - 1 }))}>-</button>
					<input
						value={item.quantity}
						onChange={e =>
							dispatch(update({ id: product.id, qty: +e.target.value || 0 }))
						}
					/>
					<button onClick={() => dispatch(update({ id: product.id, qty: item.quantity + 1 }))}>+</button>
				</div>
			)}
		</div>
	);
}
