import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoValorComponent } from './catalogo-valor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from '../../app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('CatalogoValorComponent', () => {
  let component: CatalogoValorComponent;
  let fixture: ComponentFixture<CatalogoValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        FormsModule,
        MatSelectModule,
        FormsModule,
        AppRoutingModule
      ],
      declarations: [CatalogoValorComponent],
      providers: [provideAnimationsAsync()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
