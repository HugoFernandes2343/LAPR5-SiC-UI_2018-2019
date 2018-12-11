import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialComponent } from './material/material.component';
import { AcabamentoComponent } from './acabamento/acabamento.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { EncomendasComponent } from './encomendas/encomendas.component';
import { MaterialDetailComponent } from './material-detail/material-detail.component';
import { CategoriaComponent }  from './categoria/categoria.component';
import { CategoriaDetailComponent } from './categoria-detail/categoria-detail.component';
import { MaterialacabamentoComponent } from './materialacabamento/materialacabamento.component';
import { MaterialacabamentoDetailComponent } from './materialacabamento-detail/materialacabamento-detail.component';
import { ProdutoComponent } from './produto/produto.component'
import { ProdutoDetailComponent } from './produto-detail/produto-detail.component'
import { ProdutoCreateComponent } from './produto-create/produto-create.component'
import { ProdutoPartesComponent } from './produto-partes/produto-partes.component'
import { AcabamentoDetailComponent } from './acabamento-detail/acabamento-detail.component';
import { CriarencomendaComponent } from './criarencomenda/criarencomenda.component'
import { CriarencomendaDetailComponent } from './criarencomenda-detail/criarencomenda-detail.component'
import { GerirencomendasComponent } from './gerirencomendas/gerirencomendas.component'
import { GerirencomendasDetailComponent } from './gerirencomendas-detail/gerirencomendas-detail.component'
import { GerirencomendasItemprodutosDetailComponent } from './gerirencomendas-itemprodutos-detail/gerirencomendas-itemprodutos-detail.component'
import { GerirencomendasItemprodutosCreateComponent } from './gerirencomendas-itemprodutos-create/gerirencomendas-itemprodutos-create.component'

const routes: Routes = [
  { path: 'encomendas/gerirencomendas', component: GerirencomendasComponent },
  { path: 'gerirencomendas/:id', component: GerirencomendasDetailComponent },
  { path: 'encomendas/encomendar', component: CriarencomendaComponent },
  { path: 'encomendar/:id', component: CriarencomendaDetailComponent },
  { path: 'encomenda/:id/createitemproduto', component: GerirencomendasItemprodutosCreateComponent },
  { path: 'gerirencomendas/:id/itensProduto/:idItem', component: GerirencomendasItemprodutosDetailComponent },
  { path: 'catalogo/material', component: MaterialComponent },
  { path: 'catalogo/acabamento', component: AcabamentoComponent },
  { path: 'catalogo/materialacabamento', component: MaterialacabamentoComponent },
  { path: 'catalogo/categoria', component: CategoriaComponent },
  { path: 'catalogo/produto', component: ProdutoComponent },
  { path: 'produto/:id', component: ProdutoDetailComponent },
  { path: 'produtoCreate/:id', component: ProdutoCreateComponent },
  { path: 'produtoPartes/:id', component: ProdutoPartesComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'encomendas', component: EncomendasComponent },
  { path: 'material/:id', component: MaterialDetailComponent },
  { path: 'categoria/:id', component: CategoriaDetailComponent },
  { path: 'acabamento/:id', component: AcabamentoDetailComponent },
  { path: 'materialacabamento/:id', component: MaterialacabamentoDetailComponent },
  { path: '', redirectTo: 'catalogo', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
