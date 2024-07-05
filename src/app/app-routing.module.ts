import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogosComponent } from './componentes/catalogos/catalogos.component';
import { FormsComponent } from './forms/forms.component';

const routes: Routes = [
  {path:'catalogos', component:CatalogosComponent},
  {path:'forms', component:FormsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
