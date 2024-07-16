import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

export interface PeriodicElement {
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


@Injectable({
  providedIn: 'root'
})
export class PeriodicElementService {
  
  private apiUrl = environment.link; 

  constructor(private http: HttpClient) {}

  getElements(): Observable<PeriodicElement[]> {
    const url = `${this.apiUrl}/catalogo-valor`;
    return this.http.get<any[]>(url).pipe(
      map(data => data.map(item => ({
        id: item.id,
        valor: item.valor,
        alias: item.alias,
        descripcion: item.descripcion,
        catalogo: {
          id: item.__catalogo__?.id || 0,
          nombre: item.__catalogo__?.nombre || '',
          descripcion: item.__catalogo__?.descripcion || ''
        }
      }))),
      catchError(this.handleError)
    );
  }

  createElement(element: any): Observable<update> {
    const url = `${this.apiUrl}/catalogo-valor`;
    console.log(element);
    return this.http.post<any>(url, element).pipe(
      map(data => ({
        id: data.id,
        valor: data.valor,
        alias: data.alias,
        descripcion: data.descripcion,
        catalogoId: data.catalogoid,
         
      })),
      catchError(this.handleError)
    );
  }

  updateElement(id: number, element: any): Observable<update> {
    const url = `${this.apiUrl}/catalogo-valor/${id}`;
    console.log(element);
    return this.http.put<any>(url, element).pipe(
      map(data => ({
        id: data.id,
        valor: data.valor,
        alias: data.alias,
        descripcion: data.descripcion,
        catalogoId: data.id,
      })),
      catchError(this.handleError),
    );
  }

  deleteElement(id: number): Observable<PeriodicElement> {
    const url = `${this.apiUrl}/catalogo-valor/${id}`;
    return this.http.delete<any>(url).pipe(
      map(data => ({
        id: data.id,
        valor: data.valor,
        alias: data.alias,
        descripcion: data.descripcion,
        catalogo: {
          id: data.__catalogo__?.id || 0,
          nombre: data.__catalogo__?.nombre || '',
          descripcion: data.__catalogo__?.descripcion || ''
        }
      })),
      catchError(this.handleError)
    );
  }

  getElementById(id: number): Observable<PeriodicElement> {
    const url = `${this.apiUrl}/catalogo-valor/${id}`;
    return this.http.get<any>(url).pipe(
      map(data => ({
        id: data.id,
        valor: data.valor,
        alias: data.alias,
        descripcion: data.descripcion,
        catalogo: {
          id: data.__catalogo__?.id || 0,
          nombre: data.__catalogo__?.nombre || '',
          descripcion: data.__catalogo__?.descripcion || ''
        }
      })),
      catchError(this.handleError)
    );
  }

  searchElements(query: string): Observable<PeriodicElement[]> {
    const url = `${this.apiUrl}/catalogo-valor/search/by?query=${query}`;
    return this.http.get<any[]>(url).pipe(
      map(data => data.map(item => ({
        id: item.id,
        valor: item.valor,
        alias: item.alias,
        descripcion: item.descripcion,
        catalogo: {
          id: item.__catalogo__?.id || 0,
          nombre: item.__catalogo__?.nombre || '',
          descripcion: item.__catalogo__?.descripcion || ''
        }
      }))),
      catchError(this.handleError)
    );
  }


  //CRUD CATALOGO

getCatalogo(): Observable<Catalogo[]> {
    const url = `${this.apiUrl}/catalogos`;
    return this.http.get<any[]>(url).pipe(
      map(data => data.map(item => ({
        id: item.id,
        nombre: item.nombre,
        descripcion: item.descripcion
      }))),
      catchError(this.handleError)
    );
  }

  searchCatalogo(query: string): Observable<Catalogo[]> {
    const url = `${this.apiUrl}/catalogos/search/by?query=${query}`;
    return this.http.get<any[]>(url).pipe(
      map(data => data.map(item => ({
        id: item.id,
        nombre: item.nombre,
        descripcion: item.descripcion
      }))),
      catchError(this.handleError)
    );
  }

  createCatalogo(element: any): Observable<Catalogo> {
    const url = `${this.apiUrl}/catalogos`;
    console.log(element);
    return this.http.post<any>(url, element).pipe(
      map(data => ({
        id: data.id,
        nombre: data.nombre,
        descripcion: data.descripcion
      })),
      catchError(this.handleError)
    );
  }

  updateCatalogo(id: number, element: any): Observable<Catalogo> {
    const url = `${this.apiUrl}/catalogos/${id}`;
    console.log(element);
    return this.http.put<any>(url, element).pipe(
      map(data => ({
        id: data.id,
        nombre: data.nombre,
        descripcion: data.descripcion
      })),
      catchError(this.handleError)
    );
  }

  deleteCatalogo(id: number): Observable<Catalogo> {
    const url = `${this.apiUrl}/catalogos/${id}`;
    return this.http.delete<any>(url).pipe(
      map(data => ({
        id: data.id,
        nombre: data.nombre,
        descripcion: data.descripcion
      })),
      catchError(this.handleError)
    );
  }

  getCatalogoById(id: number): Observable<Catalogo> {
    const url = `${this.apiUrl}/catalogos/${id}`;
    return this.http.get<any>(url).pipe(
      map(data => ({
        id: data.id,
        nombre: data.nombre,
        descripcion: data.descripcion
      })),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}