import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  id: number; // Id del elemento a editar
  nombre: string;
  descripcion: string;
  precio: number;

  dataSource: any[] = [
    { id: 1, nombre: 'Elemento 1', descripcion: 'Descripción 1', precio: 100 },
    { id: 2, nombre: 'Elemento 2', descripcion: 'Descripción 2', precio: 200 },
    { id: 3, nombre: 'Elemento 3', descripcion: 'Descripción 3', precio: 300 }
  ]; // Estructura de datos local para almacenar los elementos

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener el parámetro 'id' de la ruta si existe
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convertir a número
      if (this.id) {
        // Si hay un id, buscar el elemento en el dataSource y cargar sus datos
        const elemento = this.dataSource.find(e => e.id === this.id);
        if (elemento) {
          this.nombre = elemento.nombre;
          this.descripcion = elemento.descripcion;
          this.precio = elemento.precio;
        }
      }
    });
  }

  guardar() {
    // Aquí puedes guardar los datos editados en la estructura de datos local
    const elementoEditado = {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio
    };

    // Reemplazar el elemento editado en el dataSource
    const index = this.dataSource.findIndex(e => e.id === this.id);
    if (index !== -1) {
      this.dataSource[index] = elementoEditado;
    }

    // Después de guardar, redirige a la pantalla de catálogos
    this.router.navigate(['/catalogos']);
  }

  cancelar() {
    // Implementa la lógica para cancelar la operación (por ejemplo, redirigir a la pantalla de catálogos)
    this.router.navigate(['/catalogos']);
  }
}
