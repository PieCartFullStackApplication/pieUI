export interface Order {
    id: number;
    title: string;
    price: number;
    productMap: Array<string>;
    initDate: Date;
}
