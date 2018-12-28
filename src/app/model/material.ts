import { Finishing } from './finishing';

export class Material {
  materialId: number;
  description: string;
  type:string;
  finishesDTO: Finishing[];
}