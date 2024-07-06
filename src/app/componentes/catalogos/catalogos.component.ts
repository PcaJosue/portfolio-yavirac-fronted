import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AgregarComponent } from '../agregar/agregar.component';
import { EditarComponent } from '../editar/editar.component';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.scss']
})
export class CatalogosComponent {
  dataSource = new MatTableDataSource<any>([
    { id: 1, nombre: 'Elemento 1', descripcion: 'Descripción 1', precio: 100 },
    { id: 2, nombre: 'Elemento 2', descripcion: 'Descripción 2', precio: 200 },
    { id: 3, nombre: 'Elemento 3', descripcion: 'Descripción 3', precio: 300 },
    // Aquí puedes inicializar tu dataSource con datos iniciales
  ]);
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'acciones'];

  @ViewChild(AgregarComponent) agregarComponent: AgregarComponent;
  @ViewChild(EditarComponent) editarComponent: EditarComponent;

  constructor(private router: Router) {}

  agregarNuevo() {
    this.router.navigate(['/agregar']); // Navega a la página de agregar/editar
  }

  editar(element: any) {
    this.router.navigate(['/editar', { id: element.id }]); // Navega a la página de agregar/editar con el ID del elemento
  }

  eliminar(elemento: any) {
    const index = this.dataSource.data.findIndex(e => e.id === elemento.id);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.refreshDataSource();
    }
  }

  refreshDataSource() {
    this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
