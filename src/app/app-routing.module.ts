import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './model/dashboard/dashboard.component';
import { CatalogComponent } from './model/catalog/catalog.component';
import { LoginComponent } from './model/login/login.component';
import { RegisterComponent } from './model/register/register.component';
import { ProductComponent } from './model/product/product.component';
import { WizardStep1Component } from './model/wizard/wizard-step1/wizard-step1.component';
import { WizardStep2Component } from './model/wizard/wizard-step2/wizard-step2.component';
import { WizardStep3Component } from './model/wizard/wizard-step3/wizard-step3.component';
import { AboutComponent } from './model/about/about.component';
import { EditProductComponent } from './model/edit-product/edit-product.component';
import { CreateProductComponent } from './model/create-product/create-product.component';
import { ListItemproductComponent } from './model/list-itemproduct/list-itemproduct.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'wizard1/:id', component: WizardStep1Component },
  { path: 'wizard2', component: WizardStep2Component },
  { path: 'wizard3', component: WizardStep3Component },
  { path: 'about', component: AboutComponent },
  { path: 'edit/:id', component: EditProductComponent },
  { path: 'create-product', component: CreateProductComponent },
  { path: 'list-itemproduct', component: ListItemproductComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
