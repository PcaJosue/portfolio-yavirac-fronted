import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Catalogo, PeriodicElement, PeriodicElementService } from '../service.service';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo-valor.component.html',
  styleUrls: ['./catalogo-valor.component.scss'],
})
export class CatalogoValorComponent implements AfterViewInit {
  searchQuery: string = ''; 

  displayedColumns: string[] = ['id', 'valor', 'alias', 'descripcion', 'catalogo', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadElements();
  }

  constructor(private router: Router, private elementService: PeriodicElementService,public dialog: MatDialog) {}

  goToCatalogoValorForm() {
    this.router.navigate(['/catalogo-valor-form']);
  }

  editCatalogoValor(valores: PeriodicElement) {
    this.router.navigate(['/edit-catalogo-valor', valores.id]); //editar
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

  deleteCatalogos(valores: PeriodicElement): void {
    console.log (valores.id)
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: { message: `¿Estás seguro que quieres eliminar ${valores.valor}?`, id: valores.id  }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.elementService.deleteElement(valores.id).subscribe(() => {
          this.router.navigate(['/catalogo-valor']);
        });
        this.elementService.searchElements(this.searchQuery).subscribe((elements) => {
          this.dataSource.data = elements;
        });
      }
    });
  }
}
