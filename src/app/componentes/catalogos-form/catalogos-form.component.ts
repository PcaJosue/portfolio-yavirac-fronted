import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { valores } from '../catalogos/catalogos.component';

@Component({
  selector: 'app-catalogos-form',
  templateUrl: './catalogos-form.component.html',
  styleUrls: ['./catalogos-form.component.scss']
})
export class CatalogosFormComponent implements OnInit{
  catalogoForm: FormGroup;
  mode: 'edit' | 'create';
  id: string;
  
  constructor( 
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ){
    
    this.catalogoForm = this.fb.group({
      id: [''], 
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.mode = this.id ? 'edit' : 'create';

    if (this.mode === 'edit') {
      const catalogoValor=valores.filter(valor=>valor.id===+this.id)[0]
      console.log(catalogoValor)
      this.catalogoForm.patchValue({...catalogoValor})
    }
  }

  guardar(): void {
    if (this.catalogoForm.valid) {
      const formData = this.catalogoForm.value;
      console.log(this.catalogoForm)
      this.catalogoForm.patchValue({...this.catalogoForm})
      this.goBack();
    } 
  }

  goBack(){
    this.router.navigate(['catalogos'])
  }

}