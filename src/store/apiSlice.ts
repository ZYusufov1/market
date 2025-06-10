// src/store/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ProductPage, Review } from '../types';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://o-complex.com:1337',
		headers: { 'Content-Type': 'application/json' },
	}),
	endpoints: builder => ({
		getProducts: builder.query<ProductPage, { page: number; page_size: number }>({
			query: ({ page, page_size }) => `/products?page=${page}&page_size=${page_size}`,
		}),
		getReviews: builder.query<Review[], void>({
			query: () => `/reviews`,
		}),
		createOrder: builder.mutation<
			{ success: 1 } | { success: 0; error: string },
			{ phone: string; cart: { id: number; quantity: number }[] }
		>({
			query: body => ({
				url: '/order',
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetReviewsQuery,
	useCreateOrderMutation,
} = apiSlice;
