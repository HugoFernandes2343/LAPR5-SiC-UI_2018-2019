import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   token: any = "no-token";
   loggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  authenticate(user: User): Observable<any> {
    return this.http.post<any>("https://localhost:8081/users/login", user);
  }
  
  register(user: User): Observable<any> {
    return this.http.post<any>("https://localhost:8081/users/register", user);
  }


}

