import { ProductType } from "./ProductType.enum";

export interface Product {
    id: number;
    title: string;
    productType: ProductType;
    price: number;
    description?: string;
    specification?: string;
  }