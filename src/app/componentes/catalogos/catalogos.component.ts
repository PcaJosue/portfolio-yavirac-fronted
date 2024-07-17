import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { Catalogo, CatalogoValor } from '../../Interfaces/catalogosInterfaces';
import { CatalogosService } from '../catalogos.service';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.scss']
})
export class CatalogosComponent implements AfterViewInit {
  searchQuery: string = ''; 
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'action'];
  dataSource = new MatTableDataSource<Catalogo>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private router: Router, private elementService: CatalogosService, public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadElements();
  }

  goToCatalogoValorForm() {
    this.router.navigate(['/catalogo-form']);
  }

  editCatalogos (valores: CatalogoValor ) {
    this.router.navigate(['/editar-catalogo/', valores.id]); 
  }

  crearCatalogosForm() {
    this.router.navigate(['/crear-catalogo']);
  }

  loadElements() {
    if (this.searchQuery && this.searchQuery.length > 0) {
      this.loadElementsByQuery();
    } else {
      this.loadAllElements();
    }
  }

  loadAllElements() {
    this.elementService.getCatalogo().subscribe((elements) => {
      this.dataSource.data = elements;
    });
  }

  loadElementsByQuery() {
    this.elementService.searchCatalogo(this.searchQuery).subscribe((elements) => {
      this.dataSource.data = elements;
    });
  }

  deleteCatalogos(valores: Catalogo): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: { message: `¿Está seguro que quiere eliminar ${valores.nombre}?`, id: valores.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.elementService.deleteCatalogo(valores.id).subscribe(() => {
          this.loadElements(); 
        });
      }
    });
  }
}
