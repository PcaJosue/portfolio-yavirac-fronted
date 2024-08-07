import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmacionComponent } from './confirmacion.component';
import {
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from '../../app-routing.module';

describe('ConfirmacionComponent', () => {
  let component: ConfirmacionComponent;
  let fixture: ComponentFixture<ConfirmacionComponent>;
  let matDialogRefMock: Partial<MatDialogRef<any>>;

  beforeEach(async () => {
    matDialogRefMock = {
      close: jasmine.createSpy('close'),
    };

    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatButtonModule, AppRoutingModule],
      declarations: [ConfirmacionComponent],
      providers: [
        {
          provide: MAT_DIALOG_DEFAULT_OPTIONS,
          useValue: { hasBackdrop: false },
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: MatDialogRef, useValue:{}}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
