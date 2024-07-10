import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogosComponent } from './componentes/catalogos/catalogos.component';
import { CatalogosFormComponent } from './componentes/catalogos-form/catalogos-form.component';

const routes: Routes = [
  {path:'catalogos', component:CatalogosComponent},
  {path:'crear-catalogo', component:CatalogosFormComponent},
  {path:'editar-catalogo/:id', component:CatalogosFormComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export class ConfirmacionModule { }
