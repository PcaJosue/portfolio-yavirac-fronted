import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoValorComponent } from './catalogo-valor.component';

describe('CatalogoValorComponent', () => {
  let component: CatalogoValorComponent;
  let fixture: ComponentFixture<CatalogoValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoValorComponent]
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
