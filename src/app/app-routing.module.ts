import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiCCMDashboardComponent } from './si-c-cm-dashboard/si-c-cm-dashboard.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ItemProductComponent } from './itemproduct/itemproduct.component';
import { SicClientDashboardComponent } from './sic-client-dashboard/sic-client-dashboard.component';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { MaterialComponent } from './material/material.component';
import { FinishingComponent } from './finishing/finishing.component';
import { DimensionComponent } from './dimension/dimension.component';
import { CombinationComponent } from './combination/combination.component';
import { ItemproductDetailComponent } from './itemproduct-detail/itemproduct-detail.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MaterialDetailComponent } from './material-detail/material-detail.component';
import { FinishingDetailComponent } from './finishing-detail/finishing-detail.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogDetailComponent } from './catalog-detail/catalog-detail.component';  
import { CatalogCustomCreationComponent } from './catalog-custom-creation/catalog-custom-creation.component'; 
import { FactoriesComponent } from './factories/factories.component'; 
import { FactoryDetailComponent } from './factory-detail/factory-detail.component';

const routes: Routes = [
  { path: 'SiC_it1', component: SiCCMDashboardComponent },
  { path: 'SiC_it2', component: SicClientDashboardComponent},
  { path: 'Product', component: ProductComponent },
  { path: 'Product/:productId', component: ProductDetailComponent },
  { path: 'ItemProduct', component: ItemProductComponent},
  { path: 'Category', component: CategoryComponent},
  { path: 'Category/:categoryId', component: CategoryDetailComponent },
  { path: 'Finishing', component: FinishingComponent},
  { path: 'Finishing/:finishingId', component: FinishingDetailComponent },
  { path: 'Material', component: MaterialComponent},
  { path: 'Material/:materialId', component: MaterialDetailComponent },
  { path: 'Dimension/:dimensionId', component: DimensionComponent},
  { path: 'Combination', component: CombinationComponent},
  { path: 'ItemProduct/:itemId', component: ItemproductDetailComponent},
  { path: 'Order', component: OrderComponent},
  { path: 'Order/:orderId', component: OrderDetailComponent},
  { path: 'Catalog', component: CatalogComponent},
  { path: 'Catalog/:catalogId', component: CatalogDetailComponent},
  { path: 'CatalogCreator', component: CatalogCustomCreationComponent},
  { path: 'Catalog/Creator', component: CatalogCustomCreationComponent},
  { path: 'Factories', component: FactoriesComponent },
  { path: 'Factories/:factoryId', component: FactoryDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
