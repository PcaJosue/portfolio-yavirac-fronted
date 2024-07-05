import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  formulario: FormGroup;
  isEditing: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      id: [data ? data.id : null],
      nombre: [data ? data.nombre : '', Validators.required],
      descripcion: [data ? data.descripcion : '', Validators.required],
      precio: [data ? data.precio : '', Validators.required]
    });

    if (data && data.id) {
      this.isEditing = true;
    }
  }

  onSubmit(): void {
    if (this.isEditing) {
      // Editar elemento existente
      this.dialogRef.close({ ...this.formulario.value });
    } else {
      // Agregar nuevo elemento
      this.dialogRef.close(this.formulario.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
