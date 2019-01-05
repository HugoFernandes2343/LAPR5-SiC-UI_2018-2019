import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RgpdComponent } from './rgpd/rgpd.component';
import { DeleteComponent } from './delete/delete.component';
import { SicDmDashboardComponent } from './sic-dm-dashboard/sic-dm-dashboard.component';
import { SiCCMDashboardComponent } from './si-c-cm-dashboard/si-c-cm-dashboard.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SicClientDashboardComponent } from './sic-client-dashboard/sic-client-dashboard.component';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { MaterialComponent } from './material/material.component';
import { FinishingComponent } from './finishing/finishing.component';
import { DimensionComponent } from './dimension/dimension.component';
import { CombinationComponent } from './combination/combination.component';
import { OrderComponent } from './order/order.component';
import { ConsultOrderComponent } from './consultorder/consultorder.component';
import { CreateOrderComponent } from './createorder/createorder.component';
import { ConsultOrderDetailComponent } from './consultorder-detail/consultorder-detail.component';
import { MaterialDetailComponent } from './material-detail/material-detail.component';
import { FinishingDetailComponent } from './finishing-detail/finishing-detail.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogDetailComponent } from './catalog-detail/catalog-detail.component';  
import { CatalogCustomCreationComponent } from './catalog-custom-creation/catalog-custom-creation.component'; 
import { FactoriesComponent } from './factories/factories.component'; 
import { FactoryDetailComponent } from './factory-detail/factory-detail.component';
import { TimeoutComponent } from'./timeout/timeout.component';
import { PriceDetailComponent } from './price-detail/price-detail.component';
import {CollectionComponent} from "./collection/collection.component";
import {CollectionDetailComponent} from "./collection-detail/collection-detail.component";
import {CollectionCreationComponent} from "./collection-creation/collection-creation.component";
import {CreateorderDetailComponent} from "./createorder-detail/createorder-detail.component";

const routes: Routes = [
  
  { path: 'SiC_it1', component: SiCCMDashboardComponent },
  { path: 'SiC_it2', component: SicClientDashboardComponent},
  { path: 'SiC_it3', component: SicDmDashboardComponent},
  { path: 'Product', component: ProductComponent },
  { path: 'Product/:productId', component: ProductDetailComponent },
  { path: 'Category', component: CategoryComponent},
  { path: 'Category/:categoryId', component: CategoryDetailComponent },
  { path: 'Finishing', component: FinishingComponent},
  { path: 'Finishing/:finishingId', component: FinishingDetailComponent },
  { path: 'Material', component: MaterialComponent},
  { path: 'Material/:materialId', component: MaterialDetailComponent },
  { path: 'Dimension/:dimensionId', component: DimensionComponent},
  { path: 'Combination', component: CombinationComponent},
  { path: 'Order', component: OrderComponent},
  { path: 'ConsultOrder', component: ConsultOrderComponent},
  { path: 'ConsultOrder/:orderId', component: ConsultOrderDetailComponent},
  { path: 'CreateOrder', component: CreateOrderComponent},
  { path: 'CreateOrder/:orderId', component: CreateorderDetailComponent},
  { path: 'Catalog', component: CatalogComponent},
  { path: 'Catalog/:catalogId', component: CatalogDetailComponent},
  { path: 'CatalogCreator', component: CatalogCustomCreationComponent},
  { path: 'login', component: LoginComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'RGPD', component: RgpdComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'timeout', component: TimeoutComponent },
  { path: 'delete', component: DeleteComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'Price/:priceId', component: PriceDetailComponent },
  { path: 'Factories', component: FactoriesComponent },
  { path: 'Factories/:factoryId', component: FactoryDetailComponent},
  { path: 'Collection', component: CollectionComponent},
  { path: 'Collection/:CollectionId', component: CollectionDetailComponent},
  { path: 'CollectionCreation', component: CollectionCreationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
