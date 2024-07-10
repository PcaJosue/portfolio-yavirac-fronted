import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catalogos, valores } from '../catalogo-valor/catalogo-valor.component';

@Component({
  selector: 'app-catalogo-valor-form',
  templateUrl: './catalogo-valor-form.component.html',
  styleUrls: ['./catalogo-valor-form.component.scss'],
})
export class CatalogoValorFormComponent implements OnInit {
  catalogos: any[] = catalogos;
  catalogoForm: FormGroup;
  mode: 'edit' | 'create';
  id: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.catalogoForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      valor: ['', Validators.required],
      alias: [''],
      catalogo: [{ value: null }, Validators.required],
      descripcion: [''],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.mode = this.id ? 'edit' : 'create';

    if (this.mode === 'edit') {
      const catalogoValor = valores.filter((valor) => valor.id === +this.id)[0];
      this.catalogoForm.patchValue({ ...catalogoValor });
      this.catalogoForm
        .get('catalogo')
        .setValue(
          catalogos.find(
            (catalogo) => catalogo.id === catalogoValor.catalogo.id
          )
        );
    }
  }

  guardar(): void {
    if (this.catalogoForm.valid) {
      const formData = this.catalogoForm.value;
      this.goBack();
    } else {
    }
  }

  goBack() {
    this.router.navigate(['catalogo-valor']);
  }
}
