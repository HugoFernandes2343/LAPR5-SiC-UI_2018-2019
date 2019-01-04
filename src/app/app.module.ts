import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { OrderComponent } from './order/order.component';
import { ConsultOrderComponent } from './consultorder/consultorder.component';
import { CreateOrderComponent } from './createorder/createorder.component';
import { ConsultOrderDetailComponent } from './consultorder-detail/consultorder-detail.component';
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
import { CollectionComponent } from './collection/collection.component';
import { CollectionDetailComponent } from './collection-detail/collection-detail.component';
import { CollectionCreationComponent } from './collection-creation/collection-creation.component';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CdkTableModule } from '@angular/cdk/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  imports: [
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    ScrollingModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MomentModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
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
    OrderComponent,
    ConsultOrderComponent,
    CreateOrderComponent,
    ConsultOrderDetailComponent,
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
    PriceDetailComponent,
    CollectionComponent,
    CollectionDetailComponent,
    CollectionCreationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
