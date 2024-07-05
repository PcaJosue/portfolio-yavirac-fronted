import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-catalogo-valor-form',
  templateUrl: './catalogo-valor-form.component.html',
  styleUrl: './catalogo-valor-form.component.scss'
})
export class CatalogoValorFormComponent {
  valor: string = '';
  
  constructor(private router:Router ,
    private route: ActivatedRoute,
  ){
    
    this.valor = this.route.snapshot.paramMap.get('valor')
   

  }
  goBack(){
    this.router.navigate(['catalogo-valor'])
  }

}
