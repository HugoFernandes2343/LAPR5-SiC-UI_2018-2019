import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { City } from './model/city'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CityService {

  //private cityUrl = 'https://lapr5-gc.azurewebsites.net/api/City'
  private cityUrl = 'https://localhost:5001/api/City'

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.cityUrl)
      .pipe(
        tap(_ => this.log('fetched cities')),
        catchError(this.handleError('getCity', []))
      );
  }

  /** POST: add a new city to the server */
  addCity(cityDTO: City): Observable<City> {
    return this.http.post<City>(this.cityUrl, cityDTO, httpOptions).pipe(
      tap((cityDTO: City) => this.log(`added city`)),
      catchError(this.handleError<City>('addCity'))
    );
  }

  /** GET city by id. */
  getCity(id: number): Observable<City> {
    const url = `${this.cityUrl}/${id}`;
    return this.http.get<City>(url).pipe(
      tap(_ => this.log(`fetched city`)),
      catchError(this.handleError<City>(`getCity`))
    );
  }

  deleteCity(city: City): any {
    const url = `${this.cityUrl}/${city.cityId}`;

    return this.http.delete<City>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted city`)),
      catchError(this.handleError<City>('deleteCity'))
    );
  }

  updateCity(city: City): Observable<City> {
    const url = `${this.cityUrl}/${city.cityId}`;
    return this.http.put(url, JSON.stringify(city), httpOptions).pipe(
      tap(_ => this.log(`updated city`)),
      catchError(this.handleError<any>('updateCity'))
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
    this.messageService.add(`CityService: ${message}`);
  }
}
