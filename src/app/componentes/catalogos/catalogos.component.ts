import { Component, OnInit } from '@angular/core';

interface Catalogo {
  id: number;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.scss']
})
export class CatalogosComponent implements OnInit {
  catalogos: Catalogo[] = [
    { id: 1, nombre: 'Catálogo 1', descripcion: 'Descripción del Catálogo 1' },
    { id: 2, nombre: 'Catálogo 2', descripcion: 'Descripción del Catálogo 2' },
    { id: 3, nombre: 'Catálogo 3', descripcion: 'Descripción del Catálogo 3' },
    { id: 4, nombre: 'Catálogo 4', descripcion: 'Descripción del Catálogo 4' },
    { id: 5, nombre: 'Catálogo 5', descripcion: 'Descripción del Catálogo 5' }
  ];
  paginaActual: number = 1;
  totalPaginas: number = 1;
  filtro: string = '';

  constructor() {}

  ngOnInit(): void {
    this.calcularTotalPaginas();
  }

  calcularTotalPaginas() {
    this.totalPaginas = Math.ceil(this.catalogos.length / 3); // Suponiendo que hay 3 elementos por página inicialmente
  }

  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  buscarCatalogos() {
    // Implementación básica de búsqueda por nombre y descripción
    const filtroMinusculas = this.filtro.toLowerCase();
    this.catalogos = [
      { id: 1, nombre: 'Catálogo 1', descripcion: 'Descripción del Catálogo 1' },
      { id: 2, nombre: 'Catálogo 2', descripcion: 'Descripción del Catálogo 2' },
      { id: 3, nombre: 'Catálogo 3', descripcion: 'Descripción del Catálogo 3' },
      { id: 4, nombre: 'Catálogo 4', descripcion: 'Descripción del Catálogo 4' },
      { id: 5, nombre: 'Catálogo 5', descripcion: 'Descripción del Catálogo 5' }
    ].filter(catalogo =>
      catalogo.nombre.toLowerCase().includes(filtroMinusculas) ||
      catalogo.descripcion.toLowerCase().includes(filtroMinusculas)
    );
    this.calcularTotalPaginas(); // Recalculamos el total de páginas después de aplicar el filtro
    this.paginaActual = 1; // Resetamos a la primera página al buscar
  }

  editarCatalogo(catalogo: Catalogo) {
    console.log('Editar:', catalogo);
    // Implementar lógica de edición aquí
  }

  eliminarCatalogo(id: number) {
    console.log('Eliminar ID:', id);
    // Implementar lógica de eliminación aquí
    // Por ejemplo, eliminar el catálogo del array this.catalogos
    this.catalogos = this.catalogos.filter(catalogo => catalogo.id !== id);
    this.calcularTotalPaginas(); // Recalculamos el total de páginas después de eliminar
  }

  agregarCatalogo() {
    // Implementar lógica para agregar un nuevo catálogo
    const nuevoCatalogo: Catalogo = {
      id: this.catalogos.length + 1, // Generar un nuevo ID basado en el tamaño actual del array
      nombre: 'Nuevo Catálogo',
      descripcion: 'Descripción del Nuevo Catálogo'
    };

    this.catalogos.push(nuevoCatalogo);
    this.calcularTotalPaginas(); // Recalculamos el total de páginas después de agregar
    this.paginaActual = Math.ceil(this.catalogos.length / 3); // Mover la página actual a la última página después de agregar
  }
}