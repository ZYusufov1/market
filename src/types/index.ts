export interface Review { id: number; text: string; }

export interface Product { id: number; image_url: string; title: string;
	description: string; price: number; }

export interface ProductPage {
	page: number; amount: number; total: number; items: Product[];
}

export interface CartItem { id: number; title: string; price: number; quantity: number; }
