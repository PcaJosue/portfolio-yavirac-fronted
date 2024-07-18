export interface DatosPersonales {
  id: number;
  apellidos: string;
  nombres: string;
  cedula: string;
  email: string;
  telefono: number;
  domicilio: string;
  estadocivil: string;
  tiposangre: string;
  contactoemer: string;
  telefonoemer: number;
  carrera: string;
  nivel: string;
}

export interface updateOrCreateDatosPersona {
  id: number;
  valor: string;
  alias: string;
  descripcion: string;
  catalogoId: number;
}
