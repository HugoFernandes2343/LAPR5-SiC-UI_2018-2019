import { Injectable } from '@angular/core';
import { Categoria } from './categoria/categoria';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categoriasUrl = 'https://arqsiedgarcatarinaluis.azurewebsites.net/api/Categoria';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoriasUrl)
    .pipe(
      tap(_ => this.log('fetched categorias')),
      catchError(this.handleError('getCategorias', []))
    );
  }
  
  getCategoria(id: number): Observable<Categoria> {
    const url = `${this.categoriasUrl}/${id}`;
    return this.http.get<Categoria>(url).pipe(
      tap(_ => this.log(`fetched categoria id=${id}`)),
      catchError(this.handleError<Categoria>(`getCategoria id=${id}`))
    );
  }

  updateCategoria(categoria: Categoria): Observable<any> {
    const url = `${this.categoriasUrl}/${categoria.id}`;
    return this.http.put(url, categoria, httpOptions).pipe(
      tap(_ => this.log(`updated categoria id=${categoria.id}`)),
      catchError(this.handleError<any>('updateCategoria'))
    );
  }

  addCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.categoriasUrl, categoria, httpOptions).pipe(
      tap((material: Categoria) => this.log(`added categoria w/ id=${categoria.id}`)),
      catchError(this.handleError<Categoria>('addCategoria'))
    );
  }

  deleteCategoria(categoria: Categoria | number): Observable<Categoria> {
    const id = typeof categoria === 'number' ? categoria : categoria.id;
    const url = `${this.categoriasUrl}/${id}`;

    return this.http.delete<Categoria>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted categoria id=${id}`)),
      catchError(this.handleError<Categoria>('deleteCategoria'))
    );
  }

  private log(message: string) {
    this.messageService.add(`CategoriaService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}