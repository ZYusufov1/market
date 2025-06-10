import Reviews from './Reviews';
import ProductGrid from './ProductGrid';
import CartBar from './CartBar';
import '../styles/index.css';

export default function App() {
  return (
      <main>
        <header><h1>тестовое задание</h1></header>
        <Reviews />
        <CartBar />
        <ProductGrid />
      </main>
  );
}
