import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiCCMDashboardComponent } from './si-c-cm-dashboard/si-c-cm-dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ItemProductComponent } from './itemproduct/itemproduct.component';
import { SicClientDashboardComponent } from './sic-client-dashboard/sic-client-dashboard.component';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { MaterialComponent } from './material/material.component';
import { FinishingComponent } from './finishing/finishing.component';
import { DimensionComponent } from './dimension/dimension.component';
import { ItemproductDetailComponent } from './itemproduct-detail/itemproduct-detail.component';
import { CombinationComponent } from './combination/combination.component';
import { OrderComponent } from './order/order.component';
import { MaterialDetailComponent } from './material-detail/material-detail.component';
import { FinishingDetailComponent } from './finishing-detail/finishing-detail.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogDetailComponent } from './catalog-detail/catalog-detail.component';
import { CatalogCustomCreationComponent } from './catalog-custom-creation/catalog-custom-creation.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { FactoriesComponent } from './factories/factories.component';
import { FactoryDetailComponent } from './factory-detail/factory-detail.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    SiCCMDashboardComponent,
    SicClientDashboardComponent,
    MessagesComponent,
    ProductComponent,
    ProductDetailComponent,
    ItemProductComponent,
    SicClientDashboardComponent,
    CategoryComponent,
    CategoryDetailComponent,
    MaterialComponent,
    FinishingComponent,
    DimensionComponent,
    ItemproductDetailComponent,
    CombinationComponent,
    OrderComponent,
    MaterialDetailComponent,
    FinishingDetailComponent,
    CatalogComponent,
    CatalogDetailComponent,
    CatalogCustomCreationComponent,
    OrderDetailComponent,
    FactoriesComponent,
    FactoryDetailComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
