import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { Order } from './model/Order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemProduct } from './model/ItemProduct';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl = 'https://lapr5-gc.azurewebsites.net/api/Order';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl)
      .pipe(
        tap(_ => this.log('fetched orders')),
        catchError(this.handleError('getOrders', []))
      );
  }

  /** POST: add a new order to the server */
  addOrder(order: Order): Observable<Order> {
    const url = `${this.orderUrl}/${order.orderId}`;
    return this.http.post<Order>(url, order, httpOptions).pipe(
      tap((order: Order) => this.log(`added order`)),
      catchError(this.handleError<Order>('addOrder'))
    );
  }

  /** GET order by id. */
  getOrder(id: number): Observable<Order> {
    const url = `${this.orderUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap(_ => this.log(`fetched order id=${id}`)),
      catchError(this.handleError<Order>(`getOrder id=${id}`))
    );
  }

  getOrderItens(id: number): Observable<ItemProduct[]> {
    const url = `${this.orderUrl}/${id}/itens`;
    return this.http.get<ItemProduct[]>(url)
    .pipe(
      tap(_ => this.log('fetched itens from order')),
      catchError(this.handleError('getOrderItens', []))
    );
  }

  getItemProduct(orderId: number, productId: number): Observable<ItemProduct> {
    const url = `${this.orderUrl}/${orderId}/itens/${productId}`;
    return this.http.get<ItemProduct>(url).pipe(
      tap(_ => this.log(`fetched item product id=${productId}`)),
      catchError(this.handleError<ItemProduct>(`getItemProduct id=${productId}`))
    );
  }

  deleteOrder(order: Order | number): Observable<Order> {
    const id = typeof order === 'number' ? order : order.orderId;
    const url = `${this.orderUrl}/${id}`;

    return this.http.delete<Order>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted order id=${id}`)),
      catchError(this.handleError<Order>('deleteOrder'))
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
    this.messageService.add(`OrderService: ${message}`);
  }
}
