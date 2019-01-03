import { Product } from './product';

export class Catalog {
    catalogId: number;
    catalogName: string;
    catalogDescription: string;
    date: Date;
    products: Product[];
}