import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogosComponent } from './componentes/catalogos/catalogos.component';
import { CatalogosFormComponent } from './componentes/catalogos-form/catalogos-form.component';
import { CatalogoValorComponent } from './componentes/catalogo-valor/catalogo-valor.component';
import { CatalogoValorFormComponent } from './componentes/catalogo-valor-form/catalogo-valor-form.component';
import { DatosPersonalesComponent } from './componentes/datos-personales/datos-personales.component';
import { DatosPersonalesFormComponent } from './componentes/datos-personales-form/datos-personales-form.component';

const routes: Routes = [
  {path:'catalogos', component:CatalogosComponent},
  {path:'crear-catalogo', component:CatalogosFormComponent},
  {path:'editar-catalogo/:id', component:CatalogosFormComponent},
  {path:"catalogo-valor",component:CatalogoValorComponent},
  {path:"catalogo-valor-form",component:CatalogoValorFormComponent},
  {path:"edit-catalogo-valor/:id",component:CatalogoValorFormComponent},
  {path: "datos-personales",component:DatosPersonalesComponent},
  {path: "datos-personales-form",component:DatosPersonalesFormComponent},
  { path: '',   redirectTo: '/catalogos', pathMatch: 'full' }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export class ConfirmacionModule { }
