import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormsComponent } from '../../forms/forms.component';

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

  @ViewChild(FormsComponent) formComponent: FormsComponent;

  constructor(public dialog: MatDialog) {}

  agregarNuevo() {
    this.openDialog(null); // Abre el formulario para agregar un nuevo elemento
  }

  editar(element: any) {
    this.openDialog(element); // Abre el formulario para editar el elemento seleccionado
  }

  eliminar(elemento: any) {
    const index = this.dataSource.data.findIndex(e => e.id === elemento.id);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
    }
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(FormsComponent, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          // Editar elemento existente
          const index = this.dataSource.data.findIndex(e => e.id === result.id);
          if (index >= 0) {
            this.dataSource.data[index] = result;
            this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
          }
        } else {
          // Agregar nuevo elemento
          const newId = this.dataSource.data.length + 1;
          result.id = newId;
          this.dataSource.data.push(result);
          this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
        }
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
