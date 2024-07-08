import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoValorComponent } from './componentes/catalogo-valor/catalogo-valor.component';
import { CatalogoValorFormComponent } from './componentes/catalogo-valor-form/catalogo-valor-form.component';

const routes: Routes = [
  {path:"catalogo-valor",component:CatalogoValorComponent},
  {path:"catalogo-valor-form",component:CatalogoValorFormComponent},
  {path:"edit-catalogo-valor/:valor",component:CatalogoValorFormComponent},
  

  { path: '',   redirectTo: '/catalogo-valor', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
