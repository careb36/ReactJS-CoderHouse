// TypeScript interfaces for the e-commerce application

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
