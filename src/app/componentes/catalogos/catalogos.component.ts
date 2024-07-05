// catalogos.component.ts

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface Elemento {
  id: number;
  nombre: string;
  // otras propiedades si las hay
}

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.scss']
})
export class CatalogosComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Elemento>;
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];

  // Ejemplo de datos (simulados o de un servicio)
  elementos: Elemento[] = [
    { id: 1, nombre: 'Elemento 1' },
    { id: 2, nombre: 'Elemento 2' },
    { id: 3, nombre: 'Elemento 3' },
    // más elementos
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.elementos);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(elemento: Elemento) {
    // Lógica para editar un elemento
  }

  eliminar(elemento: Elemento) {
    // Lógica para eliminar un elemento
  }
}