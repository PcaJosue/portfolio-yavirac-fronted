import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogosComponent } from './componentes/catalogos/catalogos.component';
import { AgregarComponent } from './componentes/agregar/agregar.component';
import { EditarComponent } from './componentes/editar/editar.component';

const routes: Routes = [
  {path:'catalogos', component:CatalogosComponent},
  {path:'agregar', component:AgregarComponent},
  {path:'editar', component:EditarComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
