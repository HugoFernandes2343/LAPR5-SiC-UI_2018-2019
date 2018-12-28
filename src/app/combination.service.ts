import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Combination } from './model/combination';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CombinationService {

  private combinationUrl = 'https://lapr5-gc.azurewebsites.net/api/Combination';
  //private combinationUrl = 'https://localhost:5001/api/Combination';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getCombinations(): Observable<Combination[]> {
    return this.http.get<Combination[]>(this.combinationUrl)
      .pipe(
        tap(_ => this.log('fetched combinations')),
        catchError(this.handleError('getCombinations', []))
      );
  }

  deleteCombination(combination: Combination): Observable<Combination> {
    const url = `${this.combinationUrl}/${combination.combinationId}`;

    return this.http.delete<Combination>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted combination`)),
      catchError(this.handleError<Combination>('deleteCombination'))
    );
  }

  addCombination(combination: Combination): Observable<Combination> {
    return this.http.post<Combination>(this.combinationUrl, JSON.stringify(combination), httpOptions).pipe(
      tap((combination: Combination) => this.log(`added combination`)),
      catchError(this.handleError<Combination>('addCombination'))
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
    this.messageService.add(`CombinationService: ${message}`);
  }
}