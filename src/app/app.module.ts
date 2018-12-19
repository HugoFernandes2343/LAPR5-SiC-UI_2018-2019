import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { CommonModule } from '@angular/common';  
import { Ng5SliderModule } from 'ng5-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './model/dashboard/dashboard.component';
import { CatalogComponent } from './model/catalog/catalog.component';
import { LoginComponent } from './model/login/login.component';
import { RegisterComponent } from './model/register/register.component';
import { ProductComponent } from './model/product/product.component';
import { WizardStep1Component } from './model/wizard/wizard-step1/wizard-step1.component';
import { AboutComponent } from './model/about/about.component';
import { WizardStep2Component } from './model/wizard/wizard-step2/wizard-step2.component';
import { WizardStep3Component } from './model/wizard/wizard-step3/wizard-step3.component';
import { EditProductComponent } from './model/edit-product/edit-product.component';
import { CreateProductComponent } from './model/create-product/create-product.component';
import { ListItemproductComponent } from './model/list-itemproduct/list-itemproduct.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CatalogComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    WizardStep1Component,
    AboutComponent,
    WizardStep2Component,
    WizardStep3Component,
    EditProductComponent,
    CreateProductComponent,
    ListItemproductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
