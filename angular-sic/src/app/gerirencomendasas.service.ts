import { Injectable } from '@angular/core';
import { Encomenda } from './gerirencomendas/encomenda';
import { Item } from './gerirencomendas-detail/item';
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
export class GerirencomendasasService {

  private encomendasUrl = 'https://projetosicencomendas.herokuapp.com/api/encomendas';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

    addEncomenda(encomenda: Encomenda): Observable<Encomenda> {
      const url = `${this.encomendasUrl}/${encomenda.encomendaId}`;
      return this.http.post<Encomenda>(url, encomenda, httpOptions).pipe(
        tap((encomenda: Encomenda) => this.log(`added encomenda w/ id=${encomenda.encomendaId}`)),
        catchError(this.handleError<Encomenda>('addEncomenda'))
      );
    }

    getEncomendas(): Observable<Encomenda[]> {
      return this.http.get<Encomenda[]>(this.encomendasUrl)
      .pipe(
        tap(_ => this.log('fetched encomendas')),
        catchError(this.handleError('getEncomendas', []))
      );
    }

    deleteEncomenda(encomenda: Encomenda | number): Observable<Encomenda> {
      const id = typeof encomenda === 'number' ? encomenda : encomenda.encomendaId;
      const url = `${this.encomendasUrl}/${id}`;
  
      return this.http.delete<Encomenda>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted encomenda id=${id}`)),
        catchError(this.handleError<Encomenda>('deleteEncomenda'))
      );
    }

    getEncomenda(id: number): Observable<Encomenda> {
      const url = `${this.encomendasUrl}/${id}`;
      return this.http.get<Encomenda>(url).pipe(
        tap(_ => this.log(`fetched encomenda id=${id}`)),
        catchError(this.handleError<Encomenda>(`getEncomenda id=${id}`))
      );
    }

    getEncomendaItens(id: number): Observable<Item[]> {
      const url = `${this.encomendasUrl}/${id}/itens`;
      return this.http.get<Item[]>(url)
      .pipe(
        tap(_ => this.log('fetched itens from encomenda')),
        catchError(this.handleError('getEncomendaItens', []))
      );
    }

    deleteItemFromEncomenda(item: Item | number, encomenda: Encomenda): Observable<Item> {
      const idProduto = typeof item === 'number' ? item : item.idProduto;
      const url = `${this.encomendasUrl}/${encomenda.encomendaId}/itens/${idProduto}`;
  
      return this.http.delete<Item>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted item id=${idProduto} from encomenda id=${encomenda.encomendaId}`)),
        catchError(this.handleError<Item>('deleteItemFromEncomenda'))
      );
    }

    updateEncomendaDetails(encomenda: Encomenda): Observable<any> {
      const url = `${this.encomendasUrl}Details/${encomenda.encomendaId}`;
      return this.http.put(url, encomenda, httpOptions).pipe(
        tap(_ => this.log(`updated encomenda id=${encomenda.encomendaId}`)),
        catchError(this.handleError<any>('updateEncomendaDetails'))
      );
    }

    getItemProduto(idEncomenda: number, idProduto: number): Observable<Item> {
      const url = `${this.encomendasUrl}/${idEncomenda}/itens/${idProduto}`;
      return this.http.get<Item>(url).pipe(
        tap(_ => this.log(`fetched item produto id=${idProduto}`)),
        catchError(this.handleError<Item>(`getItemProduto id=${idProduto}`))
      );
    }
  
    updateItemProduto(idEncomenda: number, idProduto: number, item: Item): Observable<any> {
      const url = `${this.encomendasUrl}/${idEncomenda}/itens/${idProduto}`;
      return this.http.put(url, item, httpOptions).pipe(
        tap(_ => this.log(`updated item produto id=${idProduto}`)),
        catchError(this.handleError<any>('updateItemProduto'))
      );
    }

    addItemProduto(item: Item, idEncomenda: number): Observable<Item> {
      const url = `${this.encomendasUrl}/${idEncomenda}/itens/1`;
      return this.http.post<Item>(url, item, httpOptions).pipe(
        tap((item: Item) => this.log(`added item produto w/ id=${item.idProduto}`)),
        catchError(this.handleError<Item>('addItemProduto'))
      );
    }

    private log(message: string) {
      this.messageService.add(`GerirencomendasService: ${message}`);
    }
  
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        console.error(error);
  
        this.log(`${operation} failed: ${error.message}`);
  
        return of(result as T);
      };
    }
  
}
