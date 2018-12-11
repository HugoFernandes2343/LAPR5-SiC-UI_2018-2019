import { BrowserModule } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialComponent } from './material/material.component';
import { MaterialDetailComponent } from './material-detail/material-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { EncomendasComponent } from './encomendas/encomendas.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaDetailComponent } from './categoria-detail/categoria-detail.component';
import { MaterialacabamentoComponent } from './materialacabamento/materialacabamento.component';
import { MaterialacabamentoDetailComponent } from './materialacabamento-detail/materialacabamento-detail.component';
import { ProdutoComponent } from './produto/produto.component';
import { ProdutoDetailComponent } from './produto-detail/produto-detail.component';
import { AcabamentoComponent } from './acabamento/acabamento.component';
import { AcabamentoDetailComponent } from './acabamento-detail/acabamento-detail.component';
import { ProdutoCreateComponent } from './produto-create/produto-create.component';
import { ProdutoPartesComponent } from './produto-partes/produto-partes.component';
import { CriarencomendaComponent } from './criarencomenda/criarencomenda.component';
import { CriarencomendaDetailComponent } from './criarencomenda-detail/criarencomenda-detail.component';
import { GerirencomendasComponent } from './gerirencomendas/gerirencomendas.component';
import { GerirencomendasDetailComponent } from './gerirencomendas-detail/gerirencomendas-detail.component';
import { GerirencomendasItemprodutosDetailComponent } from './gerirencomendas-itemprodutos-detail/gerirencomendas-itemprodutos-detail.component';
import { GerirencomendasItemprodutosCreateComponent } from './gerirencomendas-itemprodutos-create/gerirencomendas-itemprodutos-create.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterialComponent,
    MaterialDetailComponent,
    MessagesComponent,
    CatalogoComponent,
    CategoriaComponent,
    CategoriaDetailComponent,
    EncomendasComponent,
    MaterialacabamentoComponent,
    MaterialacabamentoDetailComponent,
    ProdutoComponent,
    ProdutoDetailComponent,
    AcabamentoComponent,
    AcabamentoDetailComponent,
    ProdutoCreateComponent,
    ProdutoPartesComponent,
    CriarencomendaComponent,
    CriarencomendaDetailComponent,
    GerirencomendasComponent,
    GerirencomendasDetailComponent,
    GerirencomendasItemprodutosDetailComponent,
    GerirencomendasItemprodutosCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
