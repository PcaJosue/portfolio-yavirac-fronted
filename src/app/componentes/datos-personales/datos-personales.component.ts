import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DatosPersonales } from '../../Interfaces/datosPersonaInterfaces';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss'],
})
export class DatosPersonalesComponent implements AfterViewInit {
  searchQuery: string = '';
  displayedColumns: string[] = ['id', 'nombre', 'cedula', 'carrera', 'nivel', 'email', 'telefono', 'estadoCivil', 'tipoSangre', 'domicilio', 'contactoEmergencia', 'telefonoEmergencia', 'action'];
  dataSource = new MatTableDataSource<DatosPersonales>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Datos quemados para mostrar en la tabla
  private datos: DatosPersonales[] = [
    {
      id: 1,
      apellidos: 'Pérez',
      nombres: 'Juan',
      cedula: '1234567890',
      carrera: 'Ingeniería',
      nivel: 'Nivel 1',
      email: 'juan.perez@example.com',
      telefono: 987654321,
      estadocivil: 'Soltero',
      tiposangre: 'A+',
      domicilio: 'Calle 123',
      contactoemer: 'Maria Pérez',
      telefonoemer: 987654322
    },
    {
      id: 2,
      apellidos: 'Gómez',
      nombres: 'Ana',
      cedula: '0987654321',
      carrera: 'Medicina',
      nivel: 'Nivel 2',
      email: 'ana.gomez@example.com',
      telefono: 987654323,
      estadocivil: 'Casado',
      tiposangre: 'O-',
      domicilio: 'Avenida 456',
      contactoemer: 'Pedro Gómez',
      telefonoemer: 987654324
    }
  ];

  constructor(private router: Router, public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadElements();
  }

  goToDatosPersonalesForm() {
    this.router.navigate(['/datos-personales-form']);
  }

  editDatosPersonales(datos: DatosPersonales) {
    this.router.navigate(['/edit-datos-personales', datos.id]); 
  }

  crearDatosPersonalesForm() {
    this.router.navigate(['/datos-personales-form']);
  }

  loadElements() {
    if (this.searchQuery && this.searchQuery.length > 0) {
      this.loadElementsByQuery();
    } else {
      this.loadAllElements();
    }
  }

  loadAllElements() {
    // Simulación de la carga de todos los elementos
    this.dataSource.data = this.datos;
  }

  loadElementsByQuery() {
    // Simulación de búsqueda de elementos
    this.dataSource.data = this.datos.filter(dato =>
      dato.nombres.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  deleteDatos(datos: DatosPersonales): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: { message: `¿Está seguro que quiere eliminar ${datos.nombres}?`, id: datos.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Simulación de eliminación del elemento
        this.dataSource.data = this.dataSource.data.filter(d => d.id !== datos.id);
      }
    });
  }
}
