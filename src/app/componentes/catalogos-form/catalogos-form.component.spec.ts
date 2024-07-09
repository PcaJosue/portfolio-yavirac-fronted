import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogosFormComponent } from './catalogos-form.component';

describe('CatalogosFormComponent', () => {
  let component: CatalogosFormComponent;
  let fixture: ComponentFixture<CatalogosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
