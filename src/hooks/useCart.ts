import { useEffect, useState } from 'react';
import { CartItem, Product } from '../types';

const LS_KEY = 'o-complex-cart';

export function useCart() {
	const [cart, setCart] = useState<CartItem[]>(() =>
		JSON.parse(localStorage.getItem(LS_KEY) || '[]'));

	useEffect(() => localStorage.setItem(LS_KEY, JSON.stringify(cart)), [cart]);

	const add = (product: Product) =>
		setCart(c => c.some(i => i.id === product.id)
			? c
			: [...c, { id: product.id, title: product.title,
				price: product.price, quantity: 1 }]);

	const update = (id: number, q: number) =>
		setCart(c => c.map(i => i.id === id ? { ...i, quantity: Math.max(q, 0) } : i)
			.filter(i => i.quantity));

	const clear = () => setCart([]);

	const totalQty = cart.reduce((s, i) => s + i.quantity, 0);
	const totalSum = cart.reduce((s, i) => s + i.quantity * i.price, 0);

	return { cart, add, update, clear, totalQty, totalSum };
}
