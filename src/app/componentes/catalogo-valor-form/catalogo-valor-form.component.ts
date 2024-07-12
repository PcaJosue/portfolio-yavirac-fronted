import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Catalogo, PeriodicElementService } from '../service.service';

@Component({
  selector: 'app-catalogo-valor-form',
  templateUrl: './catalogo-valor-form.component.html',
  styleUrls: ['./catalogo-valor-form.component.scss'],
})
export class CatalogoValorFormComponent implements OnInit {
  catalogoForm: FormGroup;
  mode: 'edit' | 'create';
  id: number;
  catalogos: Catalogo[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private periodicElementService: PeriodicElementService
  ) {
    this.catalogoForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      valor: ['', Validators.required],
      alias: [''],
      catalogo: [null, Validators.required],
      descripcion: [''],
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
    this.periodicElementService.getCatalogo().subscribe(catalogos => {
      this.catalogos = catalogos;
      console.log(catalogos);
    });
  }

  loadElementForEdit(id: number): void {
    this.periodicElementService.getElementById(id).subscribe(element => {
      this.catalogoForm.patchValue({
        id: element.id,
        valor: element.valor,
        alias: element.alias,
        catalogoId: element.catalogo.id,
        descripcion: element.descripcion,
      });
    });
  }

  guardar(): void {
    if (this.catalogoForm.valid) {
      const formData = this.catalogoForm.getRawValue();
      const newElement = {
        valor: formData.valor,
        alias: formData.alias,
        descripcion: formData.descripcion,
        catalogoId: formData.catalogo, 
      };

      if (this.mode === 'create') {
        this.periodicElementService.createElement(newElement).subscribe(() => {
          this.goBack();
        });
      } else if (this.mode === 'edit') {
        this.periodicElementService.updateElement(this.id, newElement).subscribe(() => {
          console.log (newElement);
          this.goBack();
        });
      }
    } 
  }

  goBack() {
    this.router.navigate(['catalogo-valor']);
  }
}
