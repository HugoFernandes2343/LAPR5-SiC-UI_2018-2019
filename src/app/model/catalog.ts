import { Product } from './product';

export class Catalog {
    catalogId: number;
    name: string;
    description: string;
    date : Date;
    product_list : Product[];
}