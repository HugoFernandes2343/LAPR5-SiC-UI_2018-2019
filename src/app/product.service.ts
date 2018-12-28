import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Product } from './model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'https://lapr5-gc.azurewebsites.net/api/Product';
  //private productUrl = 'https://localhost:5001/api/Product';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl)
      .pipe(
        tap(_ => this.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  /** POST: add a new product to the server */
  addProduct(productDTO: Product): Observable<Product> {
    return this.http.post<Product>(this.productUrl, productDTO, httpOptions).pipe(
      tap((productDTO: Product) => this.log(`added product`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  /** GET product by id. */
  getProduct(id: number): Observable<Product> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product`)),
      catchError(this.handleError<Product>(`getProduct`))
    );
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.productUrl}/${product.productId}`;
    return this.http.put(url, JSON.stringify(product), httpOptions).pipe(
      tap(_ => this.log(`updated product`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  addDimension(productId: number, dimensionId: number): Observable<Product> {
    const url = `${this.productUrl}/${productId}/Dimension/${dimensionId}`;
    return this.http.put(url, httpOptions).pipe(
      tap(_ => this.log(`added new dimension to product`)),
      catchError(this.handleError<any>('addDimension'))
    );
  }

  addMaterial(productId: number, materialId: number): any {
    const url = `${this.productUrl}/${productId}/Material/${materialId}`;
    return this.http.put(url, httpOptions).pipe(
      tap(_ => this.log(`added new material to product`)),
      catchError(this.handleError<any>('addMaterial'))
    );
  }

  removeMaterial(productId: number, materialId: number): any {
    const url = `${this.productUrl}/${productId}/Material/${materialId}`;
    return this.http.delete(url, httpOptions).pipe(
      tap(_ => this.log(`removed material from product`)),
      catchError(this.handleError<any>('removeMaterial'))
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

  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }
}
