import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { CatalogoValor } from '../../Interfaces/catalogosInterfaces';
import { CatalogosService } from '../catalogos.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo-valor.component.html',
  styleUrls: ['./catalogo-valor.component.scss'],
})
export class CatalogoValorComponent implements AfterViewInit {
  searchQuery: string = '';
  displayedColumns: string[] = ['id', 'valor', 'alias', 'descripcion', 'catalogo', 'action'];
  dataSource = new MatTableDataSource<CatalogoValor>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private elementService: CatalogosService, public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadElements();
  }

  goToCatalogoValorForm() {
    this.router.navigate(['/catalogo-valor-form']);
  }

  editCatalogoValor(valores: CatalogoValor) {
    this.router.navigate(['/edit-catalogo-valor', valores.id]); 
  }

  crearCatalogoValorForm() {
    this.router.navigate(['/catalogo-valor-form']);
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
      this.dataSource.data = elements;
    });
  }

  loadElementsByQuery() {
    this.elementService.searchElements(this.searchQuery).subscribe((elements) => {
      this.dataSource.data = elements;
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
