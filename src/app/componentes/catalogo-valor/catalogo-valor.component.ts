import { Component, OnInit } from '@angular/core';

interface Catalogo {
  id: number;
  Valor: string;
  Alias: string;
  Descripcion: string;
  Catalogo: string;
}

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo-valor.component.html',
  styleUrls: ['./catalogo-valor.component.scss']
})
export class CatalogoValorComponent implements OnInit {
  catalogos: Catalogo[] = [
    { id: 1, Valor: 'Catálogo 1', Alias: 'Descripción del Catálogo 1' , Descripcion: 'semestre', Catalogo: 'Curso'},
    { id: 2, Valor: 'Catálogo 2', Alias: 'Descripción del Catálogo 2' , Descripcion: 'semestre', Catalogo: 'Curso'},
    { id: 3, Valor: 'Catálogo 3', Alias: 'Descripción del Catálogo 3' , Descripcion: 'semestre', Catalogo: 'Curso'},
    { id: 4, Valor: 'Catálogo 4', Alias: 'Descripción del Catálogo 4' , Descripcion: 'semestre', Catalogo: 'Curso'},
    { id: 5, Valor: 'Catálogo 5', Alias: 'Descripción del Catálogo 5' , Descripcion: 'semestre', Catalogo: 'Curso'}
  ];
  paginaActual: number = 1;
  totalPaginas: number = 1;
  filtro: string = '';
  catalogo: { id: number; Valor: string; Alias: string; Descripcion: string; Catalogo: string; }[];

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
      { id: 1, Valor: 'Catálogo 1', Alias: 'Descripción del Catálogo 1', Descripcion: 'semestre', Catalogo: 'Curso'},
      { id: 2, Valor: 'Catálogo 2', Alias: 'Descripción del Catálogo 2' , Descripcion: 'semestre', Catalogo: 'Curso'},
      { id: 3, Valor: 'Catálogo 3', Alias: 'Descripción del Catálogo 3' , Descripcion: 'semestre', Catalogo: 'Curso'},
      { id: 4, Valor: 'Catálogo 4', Alias: 'Descripción del Catálogo 4' , Descripcion: 'semestre', Catalogo: 'Curso'},
      { id: 5, Valor: 'Catálogo 5', Alias: 'Descripción del Catálogo 5' , Descripcion: 'semestre', Catalogo: 'Curso'}
    ].filter(catalogo =>
      catalogo.Valor.toLowerCase().includes(filtroMinusculas) ||
      catalogo.Alias.toLowerCase().includes(filtroMinusculas)
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
      Valor: 'Nuevo Catálogo',
      Alias: 'Descripción del Nuevo Catálogo',
      Descripcion: 'Descripcion',
      Catalogo: 'Catalogo'
    };

    this.catalogos.push(nuevoCatalogo);
    this.calcularTotalPaginas(); // Recalculamos el total de páginas después de agregar
    this.paginaActual = Math.ceil(this.catalogos.length / 3); // Mover la página actual a la última página después de agregar
  }
}
