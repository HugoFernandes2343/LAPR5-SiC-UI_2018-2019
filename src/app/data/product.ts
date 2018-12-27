export class Product {
    prod_dotnetid: number;
    prod_name: string;
    prod_desc: string;
    prod_price: number;
    prod_minOccupation: number;
    prod_maxOccupation: number;
    prod_currentOccupation: number;
    prod_materials: [{
        material_name: string;
        material_desc: string;
        material_finishes: [{
            finish_name: string;
            finish_desc: string;
        }]
    }];
    prod_category: [{
        category_name: string;
    }];
    prod_height: number;
    prod_heightMax: number;
    prod_width: number;
    prod_widthMax: number;
    prod_depth: number;
    prod_depthMax: number;
    prod_parentProd: this;
    prod_childProds: this[];
    prod_childProdMaterialRestriction: [{
        material_name: string;
        material_finishes: [{
            finish_name: string;
            finish_desc: string;
        }]
    }];
}