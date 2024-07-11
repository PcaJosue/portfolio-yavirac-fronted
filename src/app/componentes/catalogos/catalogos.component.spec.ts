import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogosComponent } from './catalogos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from '../../app-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('CatalogosComponent', () => {
  let component: CatalogosComponent;
  let fixture: ComponentFixture<CatalogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        AppRoutingModule,
        MatPaginatorModule,
        FormsModule,
        MatTableModule
      ],
      declarations: [CatalogosComponent],
      providers:[provideAnimationsAsync('noop'),]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
