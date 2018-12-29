import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Finishing } from './model/finishing';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FinishingService {

  private finishingUrl = 'https://lapr5-gc.azurewebsites.net/api/Finishing';
  //private finishingUrl = 'https://localhost:5001/api/Finishing';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getFinishings(): Observable<Finishing[]> {
    return this.http.get<Finishing[]>(this.finishingUrl)
      .pipe(
        tap(_ => this.log('fetched finishings')),
        catchError(this.handleError('getFinishings', []))
      );
  }

  getFinishing(id: number): any {
    const url = `${this.finishingUrl}/${id}`;
    return this.http.get<Finishing>(url).pipe(
      tap(_ => this.log(`fetched finishing`)),
      catchError(this.handleError<Finishing>(`getFinishing`))
    );
  }

  deleteFinishing(finishing: Finishing): Observable<Finishing> {
    const url = `${this.finishingUrl}/${finishing.finishingId}`;

    return this.http.delete<Finishing>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted finishing`)),
      catchError(this.handleError<Finishing>('deleteFinishing'))
    );
  }

  addFinishing(finishingDTO: Finishing): any {
    return this.http.post<Finishing>(this.finishingUrl, finishingDTO, httpOptions).pipe(
      tap((finishingDTO: Finishing) => this.log(`added finishing`)),
      catchError(this.handleError<Finishing>('addFinishing'))
    );
  }

  updateFinishing(finishing: Finishing): any {
    const url = `${this.finishingUrl}/${finishing.finishingId}`;
    return this.http.put(url, JSON.stringify(finishing), httpOptions).pipe(
      tap(_ => this.log(`updated finishing`)),
      catchError(this.handleError<any>('updateFinishing'))
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
    this.messageService.add(`FinishingService: ${message}`);
  }
}
