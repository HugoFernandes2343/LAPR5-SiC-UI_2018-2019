import { Status } from './status';

export class Order {
    orderId: string;
    name: string;
    date: string;
    address: string;
    status: string;
    cost: number;
    itens: string[];
}