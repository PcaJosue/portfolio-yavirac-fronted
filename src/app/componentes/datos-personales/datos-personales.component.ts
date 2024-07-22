import { Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CatalogosService } from '../catalogos.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DatoPersonal } from '../../Interfaces/datospinterfaces';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrl: './datos-personales.component.scss'
})
export class DatosPersonalesComponent {
  searchQuery: string = '';
  displayedColumns: string[] = ['id', 'nombres', 'cedula', 'carrera', 'nivel', 'email', 'telefono', 'estadoCivil', 'tipoSangre', 'domicilio', 'contactoEmergencia', 'telefonoEmergencia', 'action'];

  dataSource = new MatTableDataSource<DatosPersonales>(ELEMENT_DATA);

  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private router: Router, private elementService: CatalogosService, public dialog: MatDialog) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cgoToCatalogoValorForm() {
    this.router.navigate(['/datos-personales']);
  }

  editCatalogoValor(valores: DatoPersonal) {
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

  deleteCatalogos(valores: DatoPersonal): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: { message: `¿Está seguro que quiere eliminar ${valores.nombres}?`, id: valores.id }
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
export interface DatosPersonales {
  id: number,
  nombres: string,
  cedula: string,
  carrera: string,
  nivel: string,
  email: string,
  telefono: number,
  estadocivil: string,
  tiposangre: string,
  domicilio: string,
  contactoemer: string,
  telefonoemer: number
}

const ELEMENT_DATA: DatosPersonales[] = [
  {
    id: 1,
    nombres: 'Juan Pérez',
    cedula: '1234567890',
    carrera: 'Desarrollo de Software',
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
    nombres: 'Ana Gómez',
    cedula: '0987654321',
    carrera: 'Arte Culinario',
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
