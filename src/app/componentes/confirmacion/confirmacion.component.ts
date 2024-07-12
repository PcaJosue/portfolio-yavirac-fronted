import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PeriodicElementService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss'],
})
export class ConfirmacionComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmacionData,
    private elementService: PeriodicElementService,
    private dialogRef: MatDialogRef<ConfirmacionComponent>,
    private router: Router,

  ) {}

  eliminarCatalogoYRealizarOtraAccion() {
    this.eliminarCatalogo();
    this.eliminarCatalogoValor();
  }
  eliminarCatalogo(): void {
    this.elementService.deleteCatalogo(this.data.id).subscribe({
      next: () => {
      this.dialogRef.close(true);
      }
    });
  }
  goBack() {
    this.router.navigate(['catalogos']);
  }

  eliminarCatalogoValor(): void {
    this.elementService.deleteElement(this.data.id).subscribe({
      next: () => {
      this.dialogRef.close(true);
      }
    });
  }


}

export interface ConfirmacionData {
  message: string;
  id: number;
  
}
