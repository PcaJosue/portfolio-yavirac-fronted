import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CatalogosComponent } from './componentes/catalogos/catalogos.component';


@NgModule({
  declarations: [
    AppComponent,
    CatalogosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
