import { Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogosService } from '../catalogos.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CatalogoValor } from '../../Interfaces/catalogosInterfaces';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrl: './datos-personales.component.scss'
})
export class DatosPersonalesComponent {
  searchQuery: string = '';
  displayedColumns: string[] = ['ID','Carrera', 'NombreCordinador', 'ApellidoCordinador', 'NombreDocente', 'ApellidoDocente', 'PeriodoAcademico', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private router: Router, private elementService: CatalogosService, public dialog: MatDialog) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cgoToCatalogoValorForm() {
    this.router.navigate(['/datos-personales']);
  }

  editCatalogoValor(valores: CatalogoValor) {
    this.router.navigate(['/edit-datos-personales', valores.id]); 
  }

  crearCatalogoValorForm() {
    this.router.navigate(['/crear-datos-personales']);
  }

  loadElements() {
    if (this.searchQuery && this.searchQuery.length > 0) {
      this.loadElementsByQuery();
    } else {
      this.loadAllElements();
    }
  }

  loadAllElements() {
    this.elementService.getElements().subscribe((elements) => {
      //this.dataSource.data = elements;
    });
  }

  loadElementsByQuery() {
    this.elementService.searchElements(this.searchQuery).subscribe((elements) => {
      //this.dataSource.data = elements;
    });
  }

  deleteCatalogos(valores: CatalogoValor): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: { message: `¿Está seguro que quiere eliminar ${valores.valor}?`, id: valores.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.elementService.deleteElement(valores.id).subscribe(() => {
          this.loadElements(); 
        });
      }
    });
  }
}
export interface PeriodicElement {
  id:number;
  Carrera: string;
  NombreCordinador: string;
  ApellidoCordinador: number;
  NombreDocente: string;
  ApellidoDocente:string;
  PeriodoAcademico:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1,NombreCordinador: 'nombre', Carrera: 'Hydrogen', ApellidoCordinador: 1.0079, NombreDocente: 'H', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 2,NombreCordinador: 'nombre', Carrera: 'Helium', ApellidoCordinador: 4.0026, NombreDocente: 'He', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 3,NombreCordinador: 'nombre', Carrera: 'Lithium', ApellidoCordinador: 6.941, NombreDocente: 'Li', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 4,NombreCordinador: 'nombre', Carrera: 'Beryllium', ApellidoCordinador: 9.0122, NombreDocente: 'Be', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 5,NombreCordinador: 'nombre', Carrera: 'Boron', ApellidoCordinador: 10.811, NombreDocente: 'B', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 6,NombreCordinador: 'nombre', Carrera: 'Carbon', ApellidoCordinador: 12.0107, NombreDocente: 'C', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 7,NombreCordinador: 'nombre', Carrera: 'Nitrogen', ApellidoCordinador: 14.0067, NombreDocente: 'N', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 8,NombreCordinador: 'nombre', Carrera: 'Oxygen', ApellidoCordinador: 15.9994, NombreDocente: 'O', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 9,NombreCordinador: 'nombre', Carrera: 'Fluorine', ApellidoCordinador: 18.9984, NombreDocente: 'F', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 10,NombreCordinador: 'nombre', Carrera: 'Neon', ApellidoCordinador: 20.1797, NombreDocente: 'Ne', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 11,NombreCordinador: 'nombre', Carrera: 'Sodium', ApellidoCordinador: 22.9897, NombreDocente: 'Na', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 12,NombreCordinador: 'nombre', Carrera: 'Magnesium', ApellidoCordinador: 24.305, NombreDocente: 'Mg', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 13,NombreCordinador: 'nombre', Carrera: 'Aluminum', ApellidoCordinador: 26.9815, NombreDocente: 'Al', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 14,NombreCordinador: 'nombre', Carrera: 'Silicon', ApellidoCordinador: 28.0855, NombreDocente: 'Si', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 15,NombreCordinador: 'nombre', Carrera: 'Phosphorus', ApellidoCordinador: 30.9738, NombreDocente: 'P', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 16,NombreCordinador: 'nombre', Carrera: 'Sulfur', ApellidoCordinador: 32.065, NombreDocente: 'S', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 17,NombreCordinador: 'nombre', Carrera: 'Chlorine', ApellidoCordinador: 35.453, NombreDocente: 'Cl', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 18,NombreCordinador: 'nombre', Carrera: 'Argon', ApellidoCordinador: 39.948, NombreDocente: 'Ar', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 19,NombreCordinador: 'nombre', Carrera: 'Potassium', ApellidoCordinador: 39.0983, NombreDocente: 'K', ApellidoDocente:'as', PeriodoAcademico:'asd'},
  {id: 20,NombreCordinador: 'nombre', Carrera: 'Calcium', ApellidoCordinador: 40.078, NombreDocente: 'Ca', ApellidoDocente:'as', PeriodoAcademico:'asd'},
];