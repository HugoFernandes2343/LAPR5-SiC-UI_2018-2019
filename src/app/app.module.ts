import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiCCMDashboardComponent } from './si-c-cm-dashboard/si-c-cm-dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SicClientDashboardComponent } from './sic-client-dashboard/sic-client-dashboard.component';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { MaterialComponent } from './material/material.component';
import { FinishingComponent } from './finishing/finishing.component';
import { DimensionComponent } from './dimension/dimension.component';
import { CombinationComponent } from './combination/combination.component';
import { MaterialDetailComponent } from './material-detail/material-detail.component';
import { FinishingDetailComponent } from './finishing-detail/finishing-detail.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogDetailComponent } from './catalog-detail/catalog-detail.component';
import { CatalogCustomCreationComponent } from './catalog-custom-creation/catalog-custom-creation.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DeleteComponent } from './delete/delete.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RgpdComponent } from './rgpd/rgpd.component';
import { SicDmDashboardComponent } from './sic-dm-dashboard/sic-dm-dashboard.component';
import { FactoriesComponent } from './factories/factories.component';
import { FactoryDetailComponent } from './factory-detail/factory-detail.component';
import { PriceDetailComponent } from './price-detail/price-detail.component';
import { TimeoutComponent } from './timeout/timeout.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  declarations: [
    AppComponent,
    SiCCMDashboardComponent,
    SicClientDashboardComponent,
    MessagesComponent,
    ProductComponent,
    ProductDetailComponent,
    SicClientDashboardComponent,
    CategoryComponent,
    CategoryDetailComponent,
    MaterialComponent,
    FinishingComponent,
    DimensionComponent,
    CombinationComponent,
    MaterialDetailComponent,
    FinishingDetailComponent,
    CatalogComponent,
    CatalogDetailComponent,
    CatalogCustomCreationComponent,
    AuthenticationComponent,
    DeleteComponent,
    LoginComponent,
    RegisterComponent,
    RgpdComponent,
    SicDmDashboardComponent,
    FactoriesComponent,
    FactoryDetailComponent,
    PriceDetailComponent,
    TimeoutComponent,
    PriceDetailComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
