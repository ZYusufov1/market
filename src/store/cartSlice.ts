import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../types';

export interface CartState {
	items: CartItem[];
	phone: string;
}

const initialState: CartState = { items: [], phone: '' };

const slice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		add(state, { payload }: PayloadAction<Product>) {
			if (!state.items.find(i => i.id === payload.id)) {
				state.items.push({ id: payload.id, title: payload.title,
					price: payload.price, quantity: 1 });
			}
		},
		update(state, { payload }: PayloadAction<{ id: number; qty: number }>) {
			state.items = state.items
				.map(i => i.id === payload.id ? { ...i, quantity: Math.max(payload.qty, 0) } : i)
				.filter(i => i.quantity);           // 0 → удалить
		},
		clear(state) {
			state.items = [];
			state.phone = '';
		},
		setPhone(state, { payload }: PayloadAction<string>) {
			state.phone = payload;
		},
	},
});

export const { add, update, clear, setPhone } = slice.actions;
export default slice.reducer;
