import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CatalogosComponent } from './componentes/catalogos/catalogos.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';


import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';


import { ReactiveFormsModule } from '@angular/forms';
import { CatalogosFormComponent } from './componentes/catalogos-form/catalogos-form.component';
import { ConfirmacionComponent } from './componentes/confirmacion/confirmacion.component'; 
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    CatalogosComponent,
    CatalogosFormComponent,
    ConfirmacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  
  providers: [
    provideAnimationsAsync(),
    provideAnimationsAsync('noop'),
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
export class ConfirmacionModule {}
