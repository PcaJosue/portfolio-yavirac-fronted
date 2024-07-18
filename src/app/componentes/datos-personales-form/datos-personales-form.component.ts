import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-personales-form',
  templateUrl: './datos-personales-form.component.html',
  styleUrls: ['./datos-personales-form.component.scss'],
})
export class DatosPersonalesFormComponent implements OnInit {
  datosForm: FormGroup;
  catalogos = [
    { id: 1, nombre: 'Carrera 1' },
    { id: 2, nombre: 'Carrera 2' },
    { id: 3, nombre: 'Carrera 3' },
    { id: 4, nombre: 'Nivel 1' },
    { id: 5, nombre: 'Nivel 2' },
    { id: 6, nombre: 'Nivel 3' },
    { id: 7, nombre: 'Soltero' },
    { id: 8, nombre: 'Casado' },
    { id: 9, nombre: 'A+' },
    { id: 10, nombre: 'O-' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.datosForm = this.fb.group({
      nombre: ['', Validators.required],
      cedula: ['', Validators.required],
      carrera: ['', Validators.required],
      nivel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      tipoSangre: ['', Validators.required],
      domicilio: [''],
      contactoEmergencia: [''],
      telefonoEmergencia: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.datosForm.valid) {
      console.log('Form data: ', this.datosForm.value);
      // Aquí se manejarían los datos del formulario, por ejemplo, guardándolos en una base de datos
    } else {
      console.log('Formulario no válido');
    }
  }
  goBack() {
    this.router.navigate(['/datos-personales']);
  }
}
