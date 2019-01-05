import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { ItemProduct } from './model/ItemProduct';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './model/product';
import { Material } from './model/material';
import { Finishing } from './model/finishing';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ItemProductService {

  private itemProductUrl = 'https://arqsi-nodejs.herokuapp.com/api/item';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getItemProducts(): Observable<ItemProduct[]> {
    return this.http.get<ItemProduct[]>(this.itemProductUrl)
      .pipe(
        tap(_ => this.log('fetched itemProducts')),
        catchError(this.handleError('getItemProducts', []))
      );
  }


  /** POST: add a new product to the server */
  addItemProduct(itemProduct: ItemProduct): Observable<ItemProduct> {
    return this.http.post<ItemProduct>(this.itemProductUrl, itemProduct, httpOptions).pipe(
      tap((itemProduct: ItemProduct) => this.log(`added product`)),
      catchError(this.handleError<ItemProduct>('addItemProduct'))
    );
  }

  /** GET product by id. */
  getItemProduct(id: string): Observable<ItemProduct> {
    const url = `${this.itemProductUrl}/${id}`;
    return this.http.get<ItemProduct>(url).pipe(
      tap(_ => this.log(`fetched itemProduct`)),
      catchError(this.handleError<ItemProduct>(`getItemProduct`))
    );
  }

  getProductInItem(id: string): Observable<Product> {
    const url = `${this.itemProductUrl}/${id}/product`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched productInIitemProduct`)),
      catchError(this.handleError<Product>(`getProductInItemProduct`))
    );
  }

  getMaterialInItem(id: string): Observable<Material> {
    const url = `${this.itemProductUrl}/${id}/material`;
    return this.http.get<Material>(url).pipe(
      tap(_ => this.log(`fetched materialInIitemProduct`)),
      catchError(this.handleError<Material>(`getMaterialInItemProduct`))
    );
  }

  getFinishingInItem(id: string): Observable<Finishing> {
    const url = `${this.itemProductUrl}/${id}/finishing`;
    return this.http.get<Finishing>(url).pipe(
      tap(_ => this.log(`fetched finishingInIitemProduct`)),
      catchError(this.handleError<Finishing>(`getFinishingInItemProduct`))
    );
  }

  deleteItem(item: ItemProduct | number): Observable<ItemProduct> {
    const id = typeof item === 'number' ? item : item.idProduto;
    const url = `${this.itemProductUrl}/${id}`;

    return this.http.delete<ItemProduct>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<ItemProduct>('deleteItem'))
    );
  }

  /** POST: add a new product to the server */
  addItem(item: ItemProduct): Observable<ItemProduct> {
    return this.http.post<ItemProduct>(this.itemProductUrl, item, httpOptions).pipe(
      tap((item: ItemProduct) => this.log(`added product`)),
      catchError(this.handleError<ItemProduct>('addProduct'))
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
    this.messageService.add(`ProductService: ${message}`);
  }
}
