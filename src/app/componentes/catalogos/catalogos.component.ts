import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacionComponent } from '../confirmacion/confirmacion.component';
import { Catalogo, PeriodicElement, PeriodicElementService } from '../service.service';


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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadElements();

  }

  constructor(private router: Router, private elementService: PeriodicElementService,
              public dialog: MatDialog) {}


    goToCatalogoValorForm() {
    this.router.navigate(['/catalogo-form']);
  }

  editCatalogos (valores: PeriodicElement ) {
    this.router.navigate(['/editar-catalogo/', valores.id]); //editar
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
    console.log (valores.id)
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '400px',
      data: { message: `¿Estás seguro que quieres eliminar ${valores.nombre}?`, id: valores.id  }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.elementService.deleteCatalogo(valores.id).subscribe(() => {
          this.router.navigate(['/catalogo-valor']);
        });
        this.elementService.searchCatalogo(this.searchQuery).subscribe((elements) => {
          this.dataSource.data = elements;
        });
      }
    });
  }

}
