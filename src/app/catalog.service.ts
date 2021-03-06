import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Catalog } from './model/catalog';
import { Product } from './model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  
  private catalogUrl = 'https://lapr5-gc.azurewebsites.net/api/Catalog';
  //private catalogUrl = 'https://localhost:5001/api/Catalog';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getCatalogs(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(this.catalogUrl)
      .pipe(
        tap(_ => this.log('fetched catalogs')),
        catchError(this.handleError('getCatalogs', []))
      );
  }

  /** GET catalog by id. */
  getCatalog(id: number): Observable<Catalog> {
    const url = `${this.catalogUrl}/${id}`;
    return this.http.get<Catalog>(url).pipe(
      tap(_ => this.log(`fetched catalog`)),
      catchError(this.handleError<Catalog>(`getCatalog`))
    );
  }

  /** POST: add a new catalog to the server */
  addCatalog(catalog: Catalog): Observable<Catalog> {
    return this.http.post<Catalog>(this.catalogUrl, catalog, httpOptions).pipe(
      tap((catalog: Catalog) => this.log(`added catalog`)),
      catchError(this.handleError<Catalog>('addCatalog'))
    );
  }

  addProductToCatalog(catalogId: number, productId: number) : Observable<Catalog> {
    const url = `${this.catalogUrl}/${catalogId}/Product/${productId}`;
    return this.http.put(url, httpOptions).pipe(
      tap(_ => this.log(`added new product to catalog`)),
      catchError(this.handleError<any>('addProductToCatalog'))
    );
  }

  updateCatalog(catalog: Catalog): Observable<Catalog> {
    const url = `${this.catalogUrl}/${catalog.catalogId}`;
    return this.http.put(url, JSON.stringify(catalog), httpOptions).pipe(
      tap(_ => this.log(`updated catalog`)),
      catchError(this.handleError<any>('updateCatalog'))
    );
  }

  deleteCatalog(catalog: Catalog): any {
    const url = `${this.catalogUrl}/${catalog.catalogId}`;
    return this.http.delete<Catalog>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted catalog`)),
      catchError(this.handleError<Catalog>('deleteCatalog'))
    );
  }

  deleteProductCatalog(catalogId: number,productId: number): any {
    const url = `${this.catalogUrl}/${catalogId}/Product/${productId}`;
    return this.http.delete(url, httpOptions).pipe(
      tap(_ => this.log(`removed product from catalog`)),
      catchError(this.handleError<any>('deleteProductCatalog'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CatalogService: ${message}`);
  }
}
