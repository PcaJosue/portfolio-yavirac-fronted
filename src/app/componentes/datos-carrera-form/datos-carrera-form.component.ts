import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogosService } from '../catalogos.service';
import { DatosCarrera } from '../datos-carrera/datos-carrera.component';

@Component({
  selector: 'app-datos-carrera-form',
  templateUrl: './datos-carrera-form.component.html',
  styleUrl: './datos-carrera-form.component.scss'
})
export class DatosCarreraFormComponent {

  datosCarreraForm: FormGroup;
  mode: 'edit' | 'create';
  id: number;
  catalogos: DatosCarrera[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private catalogosService: CatalogosService
  ) {
    this.datosCarreraForm = this.fb.group({
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

    this.getCarrera();
    
    if (this.mode === 'edit') {
      this.loadElementForEdit(this.id);
    }
  }

  getCarrera(): void {
    this.catalogosService.getCatalogo().subscribe(catalogos => {
      //this.catalogos = catalogos;
      console.log(catalogos);
    });
  }

  loadElementForEdit(id: number): void {
    this.catalogosService.getElementById(id).subscribe(element => {
      this.datosCarreraForm.patchValue({
        id: element.id,
        valor: element.valor,
        alias: element.alias,
        catalogoId: element.catalogo.id,
        descripcion: element.descripcion,
      });
    });
  }

  guardar(): void {
    if (this.datosCarreraForm.valid) {
      const formData = this.datosCarreraForm.getRawValue();
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
    this.router.navigate(['datos-carrera']);
  }
}
