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
export class PrologService {

  private prologUrl = 'http://localhost:3500/';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  
  //copy factory database to prolog knowledge base
  copyFactoryDb(){
    const url = `${this.prologUrl}copy_factory_db`
    return this.http.get<string>(url).pipe(
      tap(_ => this.log('copy factory db prolog')),
      catchError(this.handleError('copy_factory_db', []))
    );
  }
  
  //add factory to prolog knowledge base
  addFactory(name: string){
    const url = `${this.prologUrl}add_factory?city=${name}`
    return this.http.get<string>(url).pipe(
      tap(_ => this.log('post factory prolog')),
      catchError(this.handleError('add_factory', []))
    );
  }

  //remove factory from prolog knowledge base
  removeFactory(name: string){
    const url = `${this.prologUrl}remove_factory?city=${name}`
    return this.http.get<string>(url).pipe(
      tap(_ => this.log('remove factory prolog')),
      catchError(this.handleError('remove_factory', []))
    );
  }

  //list all factories in prolog KB
  listFactories(name: string){
    const url = `${this.prologUrl}list_factories${name}`
    return this.http.get<string>(url).pipe(
      tap(_ => this.log('list factories prolog')),
      catchError(this.handleError('list_factory', []))
    );
  }

  //list all cities in prolog KB
  listCities(name: string){
    const url = `${this.prologUrl}list_cities${name}`
    return this.http.get<string>(url).pipe(
      tap(_ => this.log('list cities prolog')),
      catchError(this.handleError('list_cities', []))
    );
  }

  //returns name of closest factory to given city
  closestFactory(name: string){
    const url = `${this.prologUrl}closest_city?city=${name}`
    return this.http.get<string>(url).pipe(
      tap(_ => this.log('list cities prolog')),
      catchError(this.handleError('list_cities', []))
    );
  }

  //returns path with all cities and origin in the given city
  shorterPath(name: string){
    const url = `${this.prologUrl}shorter_path?city=${name}`
    return this.http.get<string>(url).pipe(
      tap(_ => this.log('shorter_path prolog')),
      catchError(this.handleError('shorter_path', []))
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
    this.messageService.add(`PrologService: ${message}`);
  }

}
