import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';



@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo-valor.component.html',
  styleUrls: ['./catalogo-valor.component.scss']
})
export class CatalogoValorComponent  implements AfterViewInit {
  displayedColumns: string[] = ['id', 'valor', 'alias', 'descripcion','catalogo','action'];
  dataSource = new MatTableDataSource<Valor>(valores);

  searchInput: string='';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private router:Router ,
    
  ){}

  filterCatalogoValor(){
    if(!this.searchInput || this.searchInput.length === 0){
      this.dataSource = new MatTableDataSource<Valor>(valores);
      return;
    }
    const filterCatalogoValor = valores.filter( valor => valor.valor.toLowerCase().includes(this.searchInput.toLowerCase()));
    this.dataSource = new MatTableDataSource<Valor>(filterCatalogoValor);

  }
  goToCatalogoValorForm(){
    this.router.navigate(['/catalogo-valor-form'])

  }

  editCatalogoValor(valores:Valor){
    console.log(valores)
    this.router.navigate(['/edit-catalogo-valor',valores.valor])
  }

}

export interface Valor {
  valor: string;
  id: number;

  alias: string;
  descripcion: string;
  catalogo: string;
}

const valores: Valor[] = [
  {id: 1, valor: 'Primer', alias: '1er', descripcion: 'semestre inicial',catalogo:'semestres'},
  {id: 2, valor: 'Segundo', alias: '2do', descripcion: 'segundo semestre', catalogo:'semestres'},
  {id: 3, valor: 'A +', alias: 'A positivo', descripcion: 'tipo de sangre A+',catalogo:'tipo de sangre'},
];

