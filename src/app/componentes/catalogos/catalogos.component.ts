import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.scss']
})
export class CatalogosComponent  implements AfterViewInit {
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
    const filterCatalogoValor = valores.filter( valor => valor.id.toLowerCase().includes(this.searchInput.toLowerCase()));
    this.dataSource = new MatTableDataSource<Valor>(filterCatalogoValor);

  }
  goToCatalogoValorForm(){
    this.router.navigate(['/catalogos-form'])

  }

  editCatalogoValor(valores:Valor){
    console.log(valores)
    this.router.navigate(['/edit-catalogo-valor',valores.id])
  }

}

export interface Valor {
  id: string;
  valor: string;
  alias: string;
  descripcion: string;
  catalogo: string;
}

const valores: Valor[] = [
  {id: '1', valor: 'Primer', alias: '1er', descripcion: 'semestre inicial',catalogo:'semestres'},
  {id: '2', valor: 'Segundo', alias: '2do', descripcion: 'segundo semestre', catalogo:'semestres'},
  {id: '3', valor: 'A +', alias: 'A positivo', descripcion: 'tipo de sangre A+',catalogo:'tipo de sangre'},
];