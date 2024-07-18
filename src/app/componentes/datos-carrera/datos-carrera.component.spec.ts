import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosCarreraComponent } from './datos-carrera.component';

describe('DatosCarreraComponent', () => {
  let component: DatosCarreraComponent;
  let fixture: ComponentFixture<DatosCarreraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosCarreraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
