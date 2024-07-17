import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogosFormComponent } from './catalogos-form.component';
import { AppRoutingModule } from '../../app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CatalogosFormComponent', () => {
  let component: CatalogosFormComponent;
  let fixture: ComponentFixture<CatalogosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
      ],
      declarations: [CatalogosFormComponent],
      providers: [
        provideAnimationsAsync('noop'),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
