import { useGetReviewsQuery } from '../store/apiSlice';
import DOMPurify from 'dompurify';

export default function Reviews() {
	const { data, isLoading } = useGetReviewsQuery();

	return (
		<section className="reviews">
			{isLoading && <p>Загрузка отзывов...</p>}
			{data?.map(r => (
				<article
					key={r.id}
					className="review-card"
					dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(r.text) }}
				/>
			))}
		</section>
	);
}
