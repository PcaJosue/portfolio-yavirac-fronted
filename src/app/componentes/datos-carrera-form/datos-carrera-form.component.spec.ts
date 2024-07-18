import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosCarreraFormComponent } from './datos-carrera-form.component';

describe('DatosCarreraFormComponent', () => {
  let component: DatosCarreraFormComponent;
  let fixture: ComponentFixture<DatosCarreraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosCarreraFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosCarreraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
