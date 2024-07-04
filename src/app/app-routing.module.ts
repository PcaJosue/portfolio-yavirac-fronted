import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoValorComponent } from './componentes/catalogo-valor/catalogo-valor.component';

const routes: Routes = [
  {path:"catalogo-valor",component:CatalogoValorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
