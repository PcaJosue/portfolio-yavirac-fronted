import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoValorFormComponent } from './catalogo-valor-form.component';

describe('CatalogoValorFormComponent', () => {
  let component: CatalogoValorFormComponent;
  let fixture: ComponentFixture<CatalogoValorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoValorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoValorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
