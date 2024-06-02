import { Product } from "./Product.model";

export interface CartItem {
    id?: number;
    productId: number;
    title: string;
    price: number;
    availability?: boolean;
}
export class CartItemMapper {
    static mapProductToCartItem(product: Product): CartItem {
        const cartItem: CartItem = {
            productId: product.id,
            title: product.title,
            price: product.price,
            availability: true
        };
        return cartItem;
    }
}