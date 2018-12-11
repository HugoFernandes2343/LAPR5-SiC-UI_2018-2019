import { Injectable } from '@angular/core';
import { Produto } from './produto/produto';
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

export class ProdutoService {

  private produtosUrl = 'https://arqsiedgarcatarinaluis.azurewebsites.net/api/Produto';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

    getProdutos(): Observable<Produto[]> {
      return this.http.get<Produto[]>(this.produtosUrl)
      .pipe(
        tap(_ => this.log('fetched produtos')),
        catchError(this.handleError('getProdutos', []))
      );
    }

    deleteProduto(produto: Produto | number): Observable<Produto> {
      const id = typeof produto === 'number' ? produto : produto.id;
      const url = `${this.produtosUrl}/${id}`;
  
      return this.http.delete<Produto>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted produto id=${id}`)),
        catchError(this.handleError<Produto>('deleteProduto'))
      );
    }

    getProduto(id: number): Observable<Produto> {
      const url = `${this.produtosUrl}/${id}`;
      return this.http.get<Produto>(url).pipe(
        tap(_ => this.log(`fetched produto id=${id}`)),
        catchError(this.handleError<Produto>(`getProduto id=${id}`))
      );
    }
  
    updateProduto(produto: Produto): Observable<any> {
      const url = `${this.produtosUrl}/${produto.id}`;
      return this.http.put(url, produto, httpOptions).pipe(
        tap(_ => this.log(`updated produto id=${produto.id}`)),
        catchError(this.handleError<any>('updateProduto'))
      );
    }

    getPartes(id: number): Observable<Produto[]> {
      const url = `${this.produtosUrl}/${id}/Partes`;
      return this.http.get<Produto[]>(url)
      .pipe(
        tap(_ => this.log('fetched partes')),
        catchError(this.handleError('getPartes', []))
      );
    }

    addProduto(produto: Produto): Observable<Produto> {
      return this.http.post<Produto>(this.produtosUrl, produto, httpOptions).pipe(
        tap((produto: Produto) => this.log(`added produto w/ id=${produto.id}`)),
        catchError(this.handleError<Produto>('addProduto'))
      );
    }
  
    private log(message: string) {
      this.messageService.add(`ProdutoService: ${message}`);
    }
  
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        console.error(error);
  
        this.log(`${operation} failed: ${error.message}`);
  
        return of(result as T);
      };
    }
  
}
