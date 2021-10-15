import { Category } from './category';

export interface Product {
  idProduct: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  Category: number;
  image: string;
  time: string;
  createdAt: string;
  oldImage: string;
}
