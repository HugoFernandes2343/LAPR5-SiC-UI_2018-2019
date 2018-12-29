import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Material } from './model/material';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private materialUrl = 'https://lapr5-gc.azurewebsites.net/api/Material';
  //private materialUrl = 'https://localhost:5001/api/Material';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(this.materialUrl)
      .pipe(
        tap(_ => this.log('fetched materials')),
        catchError(this.handleError('getMaterials', []))
      );
  }

  addMaterial(materialDTO: Material): any {
    return this.http.post<Material>(this.materialUrl, materialDTO, httpOptions).pipe(
      tap((materialDTO: Material) => this.log(`added material`)),
      catchError(this.handleError<Material>('addMaterial'))
    );
  }

  deleteMaterial(material: Material): Observable<Material> {
    const url = `${this.materialUrl}/${material.materialId}`;

    return this.http.delete<Material>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted material`)),
      catchError(this.handleError<Material>('deleteMaterial'))
    );
  }

  getMaterial(id: number): any {
    const url = `${this.materialUrl}/${id}`;
    return this.http.get<Material>(url).pipe(
      tap(_ => this.log(`fetched material`)),
      catchError(this.handleError<Material>(`getMaterial`))
    );
  }

  addFinishing(materialId: number, selectedFinishing: number): any {
    const url = `${this.materialUrl}/${materialId}/Finishing/${selectedFinishing}`;
    return this.http.put(url, httpOptions).pipe(
      tap(_ => this.log(`added new finishing to material`)),
      catchError(this.handleError<any>('addFinishing'))
    );
  }

  removeFinishing(materialId: number, finishingId: number): any {
    const url = `${this.materialUrl}/${materialId}/Finishing/${finishingId}`;
    return this.http.delete(url, httpOptions).pipe(
      tap(_ => this.log(`removed finishing from material`)),
      catchError(this.handleError<any>('removeFinishing'))
    );
  }

  updateMaterial(material: Material): any {
    const url = `${this.materialUrl}/${material.materialId}`;
    return this.http.put(url, JSON.stringify(material), httpOptions).pipe(
      tap(_ => this.log(`updated material`)),
      catchError(this.handleError<any>('updateMaterial'))
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
    this.messageService.add(`MaterialService: ${message}`);
  }
}