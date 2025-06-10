export default function Popup({ onClose }: { onClose(): void }) {
	return (
		<div className="popup">
		<div className="box">
			<p>✅ Заказ успешно оформлен!</p>
	<button onClick={onClose}>ок</button>
		</div>
		</div>
);
}
