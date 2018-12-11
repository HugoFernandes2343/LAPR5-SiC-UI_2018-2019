import { Injectable } from '@angular/core';
import { Acabamento } from './acabamento/acabamento';
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
export class AcabamentoService {

  private acabamentosUrl = 'https://arqsiedgarcatarinaluis.azurewebsites.net/api/Acabamento';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getAcabamentos(): Observable<Acabamento[]> {
    return this.http.get<Acabamento[]>(this.acabamentosUrl)
    .pipe(
      tap(_ => this.log('fetched acabamentos')),
      catchError(this.handleError('getAcabamentos', []))
    );
  }

  getAcabamento(id: number): Observable<Acabamento> {
    const url = `${this.acabamentosUrl}/${id}`;
    return this.http.get<Acabamento>(url).pipe(
      tap(_ => this.log(`fetched acabamento id=${id}`)),
      catchError(this.handleError<Acabamento>(`getAcabamento id=${id}`))
    );
  }

  updateAcabamento(acabamento: Acabamento): Observable<any> {
    const url = `${this.acabamentosUrl}/${acabamento.id}`;
    return this.http.put(url, acabamento, httpOptions).pipe(
      tap(_ => this.log(`updated acabamento id=${acabamento.id}`)),
      catchError(this.handleError<any>('updateAcabamento'))
    );
  }

  addAcabamento(acabamento: Acabamento): Observable<Acabamento> {
    return this.http.post<Acabamento>(this.acabamentosUrl, acabamento, httpOptions).pipe(
      tap((acabamento: Acabamento) => this.log(`added Acabamento w/ id=${acabamento.id}`)),
      catchError(this.handleError<Acabamento>('addAcabamento'))
    );
  }

  deleteAcabamento(acabamento: Acabamento | number): Observable<Acabamento> {
    const id = typeof acabamento === 'number' ? acabamento : acabamento.id;
    const url = `${this.acabamentosUrl}/${id}`;

    return this.http.delete<Acabamento>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted acabamento id=${id}`)),
      catchError(this.handleError<Acabamento>('deleteAcabamento'))
    );
  }

  private log(message: string) {
    this.messageService.add(`AcabamentoService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
