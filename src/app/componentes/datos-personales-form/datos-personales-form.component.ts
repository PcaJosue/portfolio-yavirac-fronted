import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodicElement } from '../datos-personales/datos-personales.component';
import { CatalogosService } from '../catalogos.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-datos-personales-form',
  templateUrl: './datos-personales-form.component.html',
  styleUrl: './datos-personales-form.component.scss'
})
export class DatosPersonalesFormComponent {
  datosPersonalesForm: FormGroup;
  mode: 'edit' | 'create';
  id: number;
  catalogos: PeriodicElement[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private catalogosService: CatalogosService
  ) {
    this.datosPersonalesForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      Carrera: ['', Validators.required],
      NombreCordinador: [''],
      ApellidoCordinador: [null, Validators.required],
      NombreDocente: [''],
      ApellidoDocente: [''],
      PeriodoAcademico: [''],
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.mode = this.id ? 'edit' : 'create';

    this.getCatalogos();
    
    if (this.mode === 'edit') {
      this.loadElementForEdit(this.id);
    }
  }

  getCatalogos(): void {
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
    this.router.navigate(['datos-personales']);
  }
}

