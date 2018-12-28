import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dimension } from './model/dimension';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DimensionService {

  private dimensionUrl = 'https://lapr5-gc.azurewebsites.net/api/Dimension';
  //private dimensionUrl = 'https://localhost:5001/api/Dimension';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getDimensions(): Observable<Dimension[]> {
    return this.http.get<Dimension[]>(this.dimensionUrl)
      .pipe(
        tap(_ => this.log('fetched dimensions')),
        catchError(this.handleError('getDimensions', []))
      );
  }

  addDimension(dimensionDTO: Dimension): Observable<Dimension> {
    return this.http.post<Dimension>(this.dimensionUrl, dimensionDTO, httpOptions).pipe(
      tap((dimensionDTO: Dimension) => this.log(`added dimension`)),
      catchError(this.handleError<Dimension>('addDimension'))
    );
  }

  getDimension(dimensionId: number): any {
    const url = `${this.dimensionUrl}/${dimensionId}`;
    return this.http.get<Dimension>(url).pipe(
      tap(_ => this.log(`fetched dimension`)),
      catchError(this.handleError<Dimension>('getDimension'))
    );
  }

  deleteDimension(dimension: Dimension): Observable<Dimension> {
    const url = `${this.dimensionUrl}/${dimension.dimensionId}`;

    return this.http.delete<Dimension>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted dimension`)),
      catchError(this.handleError<Dimension>('deleteDimension'))
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
    this.messageService.add(`DimensionService: ${message}`);
  }
}