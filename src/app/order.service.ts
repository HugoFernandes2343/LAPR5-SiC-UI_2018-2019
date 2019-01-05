import { Injectable } from '@angular/core';
import { Order } from './model/Order';
import { ItemProduct } from './model/ItemProduct';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  private encomendasUrl = 'https://lapr5-enc.herokuapp.com/api/';

  constructor(private http: HttpClient) { }

    addOrder(encomenda: Order): Observable<Order> {
      const url = `${this.encomendasUrl}/encomendasDetails/${encomenda.orderId}/itens`;
      return this.http.post<Order>(url, encomenda, httpOptions).pipe(
        catchError(this.handleError<Order>('addEncomenda'))
      );
    }

    getOrders(): Observable<Order[]> {
      const url = `${this.encomendasUrl}/encomendas`;
      return this.http.get<Order[]>(url)
      .pipe(
        catchError(this.handleError('getEncomendas', []))
      );
    }

    deleteOrder(encomenda: Order | number): Observable<Order> {
      const id = typeof encomenda === 'number' ? encomenda : encomenda.orderId;
      const url = `${this.encomendasUrl}/encomendas/${id}`;
  
      return this.http.delete<Order>(url, httpOptions).pipe(
        catchError(this.handleError<Order>('deleteEncomenda'))
      );
    }

    getOrder(id: number): Observable<Order> {
      const url = `${this.encomendasUrl}/encomendasDetails/${id}`;
      return this.http.get<Order>(url).pipe(
        catchError(this.handleError<Order>(`getEncomenda id=${id}`))
      );
    }

    getOrderItens(id: number): Observable<ItemProduct[]> {
      const url = `${this.encomendasUrl}/encomendasDetails/${id}/itens`;
      return this.http.get<ItemProduct[]>(url)
      .pipe(
        catchError(this.handleError('getEncomendaItens', []))
      );
    }

    updateOrderDetails(encomenda: Order): Observable<any> {
      const url = `${this.encomendasUrl}/encomendasDetails/${encomenda.orderId}`;
      return this.http.put(url, encomenda, httpOptions).pipe(
        catchError(this.handleError<any>('updateEncomendaDetails'))
      );
    }

    getItemProduct(idEncomenda: number, produto: string): Observable<ItemProduct> {
      const url = `${this.encomendasUrl}/encomendasDetails/${idEncomenda}/itens/${produto}`;
      return this.http.get<ItemProduct>(url).pipe(
        catchError(this.handleError<ItemProduct>(`getItemProduto id=${produto}`))
      );
    }
  
    updateItemProduct(idEncomenda: number, produto: string, item: ItemProduct): Observable<any> {
      const url = `${this.encomendasUrl}/encomendasDetails/${idEncomenda}/itens/${produto}`;
      return this.http.put(url, item, httpOptions).pipe(
        catchError(this.handleError<any>('updateItemProduto'))
      );
    }

    addItemProduct(item: ItemProduct, idEncomenda: number): Observable<ItemProduct> {
      const url = `${this.encomendasUrl}/${idEncomenda}/itens`;
      return this.http.post<ItemProduct>(url, item, httpOptions).pipe(
        catchError(this.handleError<ItemProduct>('addItemProduto'))
      );
    }

    private log(message: string) {
      console.log(`OrdersService: ${message}`);
    }
  
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        console.error(error);
  
        this.log(`${operation} failed: ${error.message}`);
  
        return of(result as T);
      };
    }
}
