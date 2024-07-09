import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmacionData) {}
}

export interface ConfirmacionData {
  message: string;
}
