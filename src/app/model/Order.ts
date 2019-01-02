import { ItemProduct } from './ItemProduct';

export class Order {
    orderId: string;
    orderName: string;
    cost : number;
    address : string;
    date : Date;
    status : string;
    item: ItemProduct;
}