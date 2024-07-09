import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogosComponent } from './componentes/catalogos/catalogos.component';
import { CatalogosFormComponent } from './componentes/catalogos-form/catalogos-form.component';
import { ConfirmacionComponent } from './componentes/confirmacion/confirmacion.component';

const routes: Routes = [
  {path:'catalogos', component:CatalogosComponent},
  {path:'catalogosform', component:CatalogosFormComponent},
  {path:'confirmacion', component:ConfirmacionComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export class ConfirmacionModule { }
