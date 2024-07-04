import { Component } from '@angular/core';

export interface Catalog {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.scss']
})

export class CatalogosComponent {
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  catalogs: Catalog[] = [
    { id: 1, name: 'Catálogo A', price: 100 },
    { id: 2, name: 'Catálogo B', price: 200 },
    { id: 3, name: 'Catálogo C', price: 300 }
  ];

  constructor() {}

  // Métodos CRUD
  addCatalog() {
    const newId = this.catalogs.length + 1;
    const newCatalog: Catalog = { id: newId, name: `Catálogo ${newId}`, price: 0 };
    this.catalogs.push(newCatalog);
  }

  editCatalog(catalog: Catalog) {
    // Implementa la lógica para editar un catálogo aquí
    console.log('Editar', catalog);
  }

  deleteCatalog(catalogId: number) {
    // Implementa la lógica para eliminar un catálogo aquí
    this.catalogs = this.catalogs.filter(c => c.id !== catalogId);
  }
}
