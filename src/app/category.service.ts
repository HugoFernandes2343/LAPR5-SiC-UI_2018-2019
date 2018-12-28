import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from './model/category';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = 'https://arqsisic.azurewebsites.net/api/Category';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl)
      .pipe(
        tap(_ => this.log('fetched categories')),
        catchError(this.handleError('getCategories', []))
      );
  }

  /** GET category by id. */
  getCategory(id: number): Observable<Category> {
    const url = `${this.categoryUrl}/${id}`;
    return this.http.get<Category>(url).pipe(
      tap(_ => this.log(`fetched category id=${id}`)),
      catchError(this.handleError<Category>(`getCategory`))
    );
  }

  updateCategory(category: Category): Observable<Category> {
    const url = `${this.categoryUrl}/${category.categoryId}`;
    return this.http.put(url, JSON.stringify(category), httpOptions).pipe(
      tap(_ => this.log(`updated category`)),
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoryUrl, JSON.stringify(category), httpOptions).pipe(
      tap((category: Category) => this.log(`added category`)),
      catchError(this.handleError<Category>('addCategory'))
    );
  }

  deleteCategory(category: Category): Observable<Category> {
    const url = `${this.categoryUrl}/${category.categoryId}`;

    return this.http.delete<Category>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted category id=${category.categoryId}`)),
      catchError(this.handleError<Category>('deleteCategory'))
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
  this.messageService.add(`CategoryService: ${message}`);
}
}
