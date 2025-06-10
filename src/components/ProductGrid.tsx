import { useEffect, useRef, useState } from 'react';
import { useGetProductsQuery } from '../store/apiSlice';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';

export default function ProductGrid() {
	const [page, setPage] = useState(1);
	const [allProducts, setAllProducts] = useState<Product[]>([]);
	const loaderRef = useRef<HTMLDivElement | null>(null);

	const { data, isLoading, isSuccess } = useGetProductsQuery({
		page,
		page_size: 20,
	});

	useEffect(() => {
		if (isSuccess && data.items) {
			setAllProducts(prev => {
				const existing = new Set(prev.map(p => p.id));
				const uniq = data.items.filter(p => !existing.has(p.id));
				return [...prev, ...uniq];
			});
		}
	}, [data, isSuccess]);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) setPage(p => p + 1);
		}, { rootMargin: '300px' });

		if (loaderRef.current) observer.observe(loaderRef.current);
		return () => observer.disconnect();
	}, []);

	return (
		<>
			<section className="grid">
				{allProducts.map(p => (
					<ProductCard key={p.id} product={p} />
				))}
				{isLoading && <p>Загрузка...</p>}
			</section>
			<div ref={loaderRef} style={{ height: 1 }} />
		</>
	);
}
