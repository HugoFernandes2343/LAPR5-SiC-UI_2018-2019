import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Factory } from './model/factory'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})

export class FactoryService {

  private factoryUrl = 'https://lapr5-gc.azurewebsites.net/api/Factory'
  //private factoryUrl = 'https://localhost:5001/api/Factory'


  constructor(private http: HttpClient, private messageService: MessageService) { }

  getFactories(): Observable<Factory[]> {
    return this.http.get<Factory[]>(this.factoryUrl)
      .pipe(
        tap(_ => this.log('fetched factories')),
        catchError(this.handleError('getFactories', []))
      );
  }

  /** POST: add a new factory to the server */
  addFactory(factoryDTO: Factory): Observable<Factory> {
    return this.http.post<Factory>(this.factoryUrl, factoryDTO, httpOptions).pipe(
      tap((factoryDTO: Factory) => this.log(`added factory`)),
      catchError(this.handleError<Factory>('addFactory'))
    );
  }

  /** GET factory by id. */
  getFactory(id: number): Observable<Factory> {
    const url = `${this.factoryUrl}/${id}`;
    return this.http.get<Factory>(url).pipe(
      tap(_ => this.log(`fetched factory`)),
      catchError(this.handleError<Factory>(`getFactory`))
    );
  }

  deleteFactory(factory: Factory): any {
    const url = `${this.factoryUrl}/${factory.factoryId}`;

    return this.http.delete<Factory>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted factory`)),
      catchError(this.handleError<Factory>('deleteFactory'))
    );
  }

  updateFactory(factory: Factory): Observable<Factory> {
    const url = `${this.factoryUrl}/${factory.factoryId}`;
    return this.http.put(url, JSON.stringify(factory), httpOptions).pipe(
      tap(_ => this.log(`updated factory`)),
      catchError(this.handleError<any>('updateFactory'))
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
    this.messageService.add(`FactoryService: ${message}`);
  }
}
