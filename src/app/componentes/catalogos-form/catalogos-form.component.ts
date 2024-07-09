import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalogos-form',
  templateUrl: './catalogos-form.component.html',
  styleUrls: ['./catalogos-form.component.scss']
})
export class CatalogosFormComponent implements OnInit {
  id: number; // Id del elemento a editar
  valor: string;
  alias: string;
  descripcion: string;
  catalogo: string;

  dataSource: any[] = [
    {id: '1', valor: 'Primer', alias: '1er', descripcion: 'semestre inicial',catalogo:'semestres'},
    {id: '2', valor: 'Segundo', alias: '2do', descripcion: 'segundo semestre', catalogo:'semestres'},
    {id: '3', valor: 'A +', alias: 'A positivo', descripcion: 'tipo de sangre A+',catalogo:'tipo de sangre'}
  ]; // Estructura de datos local para almacenar los elementos

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener el parámetro 'id' de la ruta si existe
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convertir a número
      if (this.id) {
        // Si hay un id, buscar el elemento en el dataSource y cargar sus datos
        const id = this.dataSource.find(e => e.id === this.id);
        if (id) {
          this.id = id.id;
          this.valor = id.valor;
          this.alias = id.alias;
          this.descripcion =id.descripcion;
          this.catalogo = id.catalogo;
        }
      }
    });
  }

  guardar() {
    // Aquí puedes guardar los datos editados en la estructura de datos local
    const elementoEditado = {
      id: this.id,
      valor: this.valor,
      Alias: this.alias,
      descripcion: this.descripcion,
      catalogo: this.catalogo
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

  goBack() {
    this.router.navigate(['/catalogos']);
  }
}