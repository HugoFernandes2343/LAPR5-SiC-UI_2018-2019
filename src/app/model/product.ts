import { Dimension } from './dimension';
import { Material } from './material';
import { Category } from './category';


export class Product {
  productId: number;
  name: string;
  description: string;
  dimensions: Dimension[];
  materials: Material[];
  category: Category;
}
