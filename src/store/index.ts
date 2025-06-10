import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './cartSlice'; // ⬅️ обязательно экспортировать тип CartState
import { apiSlice } from './apiSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import type { PersistPartial } from 'redux-persist/es/persistReducer'; // ✅ нужно для типов

const persistConfig = { key: 'o-complex-cart', storage };

// ✅ ЯВНО указываем тип persistReducer:
const persistedCartReducer = persistReducer<CartState>(
	persistConfig,
	cartReducer
);

export const store = configureStore({
	reducer: {
		cart: persistedCartReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
