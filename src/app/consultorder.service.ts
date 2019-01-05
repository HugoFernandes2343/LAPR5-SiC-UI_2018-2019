import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Order } from './model/Order';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ConsultOrderService {

  private orderUrl = 'https://lapr5-gc.azurewebsites.net/api/Order';
  //private orderUrl = 'https://localhost:5001/api/Order';

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
  addOrder(orderDTO: Order): Observable<Order> {
    return this.http.post<Order>(this.orderUrl, orderDTO, httpOptions).pipe(
      tap((orderDTO: Order) => this.log(`added order`)),
      catchError(this.handleError<Order>('addOrder'))
    );
  }

  /** GET order by id. */
  getOrder(id: number): Observable<Order> {
    const url = `${this.orderUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap(_ => this.log(`fetched order`)),
      catchError(this.handleError<Order>(`getOrder`))
    );
  }

  deleteOrder(order: Order): any {
    const url = `${this.orderUrl}/${order.orderId}`;

    return this.http.delete<Order>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted order`)),
      catchError(this.handleError<Order>('deleteOrder'))
    );
  }

  updateOrder(order: Order): Observable<Order> {
    const url = `${this.orderUrl}/${order.orderId}`;
    return this.http.put(url, JSON.stringify(order), httpOptions).pipe(
      tap(_ => this.log(`updated order`)),
      catchError(this.handleError<any>('updateOrder'))
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
    this.messageService.add(`ConsultOrderService: ${message}`);
  }
}
