import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';


@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.scss']
})
export class CatalogosComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'action'];
  dataSource = new MatTableDataSource<Valor>(valores);

  searchInput: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private router: Router,
              public dialog: MatDialog) {}


    filterCatalogos() {
      if (!this.searchInput || this.searchInput.length === 0) {
        this.dataSource = new MatTableDataSource<Valor>(valores);
        console.log('Filtering catalogos...');
    }

    const filterCatalogoValor = valores.filter(valor =>
      valor.id.toString().toLowerCase().includes(this.searchInput.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<Valor>(filterCatalogoValor);
  }

  crearCatalogosForm() {
    this.router.navigate(['/crear-catalogo']);
  }

  editCatalogos(valores: Valor) {
    console.log(valores);
    this.router.navigate(['/editar-catalogo', valores.id]);
  }

  deleteCatalogos(valores: Valor) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: { message: `¿Estás seguro que quieres eliminar ${valores.nombre}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Lógica para eliminar el valor aquí
        console.log(`Eliminando ${valores.nombre}`);
      }
    });
  }

  crearCatalogoValorForm() {
    this.router.navigate(['/crear-catalogo']);
  }

}

export interface Valor {
  nombre: string;
  id: number;
  descripcion: string;

}

export const valores: Valor[] = [
  { id: 1, nombre: 'Semestre', descripcion: 'Niveles de semestre' },
  { id: 2, nombre: 'Tipo de Sangre', descripcion: 'Tipos de sangre'},
  { id: 3, nombre: 'Curso', descripcion: 'Paralelo y nivel al que pertenece'},
];
