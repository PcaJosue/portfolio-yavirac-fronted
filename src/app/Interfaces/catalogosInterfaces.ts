export interface CatalogoValor {
    id: number;
    valor: string;
    alias: string;
    descripcion: string;
    catalogo: {
      id: number;
      nombre: string;
      descripcion: string;
    };
  }
  
  export interface Catalogo {
    id: number;
    descripcion: string;
    nombre: string;
  }
  
  export interface update {
    id: number;
    valor: string;
    alias: string;
    descripcion: string;
    catalogoId: number;
  }