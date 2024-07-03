import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogosComponent } from './componentes/catalogos/catalogos.component';

const routes: Routes = [
  {path:'catalogos', component:CatalogosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
