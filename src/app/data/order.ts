import { ItemProduct } from './itemProduct';

export class Order {
    orderId: string;
    orderName: string;
    cost : number;
    address : string;
    date : Date;
    item: ItemProduct;
}