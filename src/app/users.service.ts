import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private user : User = null;
  private usersUrl = 'https://sic-utilizadores.herokuapp.com/api/utilizadores';

  constructor(private http: HttpClient) { }

  checkCredentials(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
      catchError(this.handleError<User>('registerUser'))
    );
  }

  checkInputUsername(username: string): Observable<User> {
    const url = `${this.usersUrl}/${username}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      catchError(this.handleError<User>('deleteProduto'))
    );
  }

  logoutUser(user: User): Observable<User> {
    return this.http.put<User>(this.usersUrl, user, httpOptions).pipe(
      catchError(this.handleError<User>('logoutUser'))
    );
  }

  searchUser(username:string, password:string): Observable<User> {
    const url = `${this.usersUrl}/${username}/${password}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`searchUser username=${username}`))
    );
  }

  public setUser(user: User) : void {
    this.user = user;
  }

  public getUser() : User {
    return this.user;
  }

  private log(message: string) {
    console.log(`ProdutoService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
