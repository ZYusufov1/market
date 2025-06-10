import { api } from './client';
import { ProductPage } from '../types';

export const fetchProducts = (page = 1, pageSize = 20) =>
	api.get<ProductPage>(`/products`, { params: { page, page_size: pageSize } });

