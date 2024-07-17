import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogosService } from '../catalogos.service';

@Component({
  selector: 'app-catalogos-form',
  templateUrl: './catalogos-form.component.html',
  styleUrls: ['./catalogos-form.component.scss']
})
export class CatalogosFormComponent implements OnInit{
  catalogoForm: FormGroup;
  mode: 'edit' | 'create';
  id: number;
  catalogos: any[] = []; 
  
  constructor( 
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private catalogosService: CatalogosService

  ){
    
    this.catalogoForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.mode = this.id ? 'edit' : 'create';

    
    if (this.mode === 'edit') {
      this.loadElementForEdit(this.id);
    }
  }


  loadElementForEdit(id: number): void {
    this.catalogosService.getCatalogoById(id).subscribe(element => {
      this.catalogoForm.patchValue({
        id: element.id,
        nombre: element.nombre,
        descripcion: element.descripcion,
      });
    });
  }

  guardar(): void {
    if (this.catalogoForm.valid) {
      const formData = this.catalogoForm.getRawValue();
      const newElement = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
      };

      if (this.mode === 'create') {
        this.catalogosService.createCatalogo(newElement).subscribe(() => {
          this.goBack();
        });
      } else if (this.mode === 'edit') {
        this.catalogosService.updateCatalogo(this.id, newElement).subscribe(() => {
          console.log (newElement);
          this.goBack();
        });
      }
    } else {
      // Formulario inválido
    }
  }

  goBack() {
    this.router.navigate(['catalogos']);
  }
}
