import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss'],
})
export class ConfirmacionComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmacionData,
    private dialogRef: MatDialogRef<ConfirmacionComponent>
  ) {}

  confirmar() {
    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}

export interface ConfirmacionData {
  message: string;
  id: number;
}
