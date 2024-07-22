import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogosService } from '../catalogos.service';
import { DatosPersonales } from '../datos-personales/datos-personales.component';

@Component({
  selector: 'app-datos-personales-form',
  templateUrl: './datos-personales-form.component.html',
  styleUrls: ['./datos-personales-form.component.scss'],
})
export class DatosPersonalesFormComponent implements OnInit {
  datosPersonalesForm: FormGroup;
  mode: 'edit' | 'create';
  id: number;
  catalogos = [
    { id: 1, especialidad: 'Desarrollo de Software' },
    { id: 2, especialidad: 'Arte Culinario' },
    { id: 3, especialidad: 'Turismo' },
    { id: 4, nivel: 'Nivel 1' },
    { id: 5, nivel: 'Nivel 2' },
    { id: 6, nivel: 'Nivel 3' },
    { id: 7, estado: 'Soltero' },
    { id: 8, estado: 'Casado' },
    { id: 9, sangre: 'A+' },
    { id: 10, sangre: 'O-' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private catalogosService: CatalogosService
  ) {
    this.datosPersonalesForm = this.fb.group({
      id: [{ value: '', disabled: true}],
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

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.mode = this.id ? 'edit' : 'create';

    this.getDatos();
    
    if (this.mode === 'edit') {
      this.loadElementForEdit(this.id);
    }
  }

  getDatos(): void {
    this.catalogosService.getCatalogo().subscribe(catalogos => {
      //this.catalogos = catalogos;
      console.log(catalogos);
    });
  }


  loadElementForEdit(id: number): void {
    this.catalogosService.getElementById(id).subscribe(element => {
      this.datosPersonalesForm.patchValue({
        id: element.id,
        valor: element.valor,
        alias: element.alias,
        catalogoId: element.catalogo.id,
        descripcion: element.descripcion,
      });
    });
  }

  guardar(): void {
    if (this.datosPersonalesForm.valid) {
      const formData = this.datosPersonalesForm.getRawValue();
      const newElement = {
        valor: formData.valor,
        alias: formData.alias,
        descripcion: formData.descripcion,
        catalogoId: formData.catalogo, 
      };

      if (this.mode === 'create') {
        this.catalogosService.createElement(newElement).subscribe(() => {
          this.goBack();
        });
      } else if (this.mode === 'edit') {
        this.catalogosService.updateElement(this.id, newElement).subscribe(() => {
          console.log (newElement);
          this.goBack();
        });
      }
    } 
  }



  goBack() {
    this.router.navigate(['/datos-personales']);
  }
}
