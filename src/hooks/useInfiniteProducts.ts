import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchProducts } from '../api/products';
import { Product } from '../types';

export function useInfiniteProducts() {
	const [pages, setPages] = useState<Product[][]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const loader = useRef<HTMLDivElement | null>(null);

	const load = useCallback(async () => {
		const { data } = await fetchProducts(page);
		setPages(p => [...p, data.items]);
		setHasMore(page * data.amount < data.total);
		setPage(p => p + 1);
	}, [page]);

	useEffect(() => { load(); }, []);            // 1-я страница сразу

	useEffect(() => {
		if (!loader.current) return;
		const io = new IntersectionObserver(([e]) => {
			if (e.isIntersecting && hasMore) load();
		}, { rootMargin: '300px' });
		io.observe(loader.current);
		return () => io.disconnect();
	}, [loader.current, hasMore, load]);

	return { products: pages.flat(), loader };
}
