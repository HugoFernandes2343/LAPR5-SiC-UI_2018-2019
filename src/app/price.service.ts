import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Price } from './model/price';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private priceUrl = 'https://lapr5-gc.azurewebsites.net/api/Price';
  //private priceUrl = 'https://localhost:5001/api/Price';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  /* Returns all prices */
  getPrices(): Observable<Price[]> {
    return this.http.get<Price[]>(this.priceUrl)
      .pipe(
        tap(_ => this.log('fetched prices')),
        catchError(this.handleError('getPrices', []))
      );
  }

  /** GET price by id. */
  getPrice(id: number): Observable<Price> {
    const url = `${this.priceUrl}/${id}`;
    return this.http.get<Price>(url).pipe(
      tap(_ => this.log(`fetched price id=${id}`)),
      catchError(this.handleError<Price>(`getPrice`))
    );
  }

  /* PUT price */
  updatePrice(price: Price): Observable<Price> {
    const url = `${this.priceUrl}/${price.priceId}`;
    return this.http.put(url, JSON.stringify(price), httpOptions).pipe(
      tap(_ => this.log(`updated price`)),
      catchError(this.handleError<any>('updatePrice'))
    );
  }

  /* POST price*/
  addPrice(price: Price): Observable<Price> {
    return this.http.post<Price>(this.priceUrl, JSON.stringify(price), httpOptions).pipe(
      tap((price: Price) => this.log(`added price`)),
      catchError(this.handleError<Price>('addPrice'))
    );
  }

  /* DELETE price*/
  deletePrice(price: Price): Observable<Price> {
    const url = `${this.priceUrl}/${price.priceId}`;

    return this.http.delete<Price>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted price id=${price.priceId}`)),
      catchError(this.handleError<Price>('deletePrice'))
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
    this.messageService.add(`PriceService: ${message}`);
  }
  
}
