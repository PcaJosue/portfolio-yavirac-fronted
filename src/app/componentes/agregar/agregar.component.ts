import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent {
  nombre: string;
  descripcion: string;
  precio: number;

  dataSource: any[] = []; // Estructura de datos local para almacenar los elementos

  constructor(private router: Router) {}

  guardar() {
    // Aquí puedes guardar los datos en la estructura de datos local
    const nuevoElemento = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio
    };

    this.dataSource.push(nuevoElemento); // Agregar el nuevo elemento al dataSource

    // Después de guardar, redirige a la pantalla de catálogos
    this.router.navigate(['/catalogos']);
  }

  cancelar() {
    // Implementa la lógica para cancelar la operación (por ejemplo, redirigir a la pantalla de catálogos)
    this.router.navigate(['/catalogos']);
  }
}
