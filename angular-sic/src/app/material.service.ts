import { Injectable } from '@angular/core';
import { Material } from './material/material';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private materialsUrl = 'https://arqsiedgarcatarinaluis.azurewebsites.net/api/Material';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(this.materialsUrl)
    .pipe(
      tap(_ => this.log('fetched materials')),
      catchError(this.handleError('getMaterials', []))
    );
  }

  getMaterial(id: number): Observable<Material> {
    const url = `${this.materialsUrl}/${id}`;
    return this.http.get<Material>(url).pipe(
      tap(_ => this.log(`fetched material id=${id}`)),
      catchError(this.handleError<Material>(`getMaterial id=${id}`))
    );
  }

  updateMaterial(material: Material): Observable<any> {
    const url = `${this.materialsUrl}/${material.id}`;
    return this.http.put(url, material, httpOptions).pipe(
      tap(_ => this.log(`updated material id=${material.id}`)),
      catchError(this.handleError<any>('updateMaterial'))
    );
  }

  addMaterial(material: Material): Observable<Material> {
    return this.http.post<Material>(this.materialsUrl, material, httpOptions).pipe(
      tap((material: Material) => this.log(`added material w/ id=${material.id}`)),
      catchError(this.handleError<Material>('addMaterial'))
    );
  }

  deleteMaterial(material: Material | number): Observable<Material> {
    const id = typeof material === 'number' ? material : material.id;
    const url = `${this.materialsUrl}/${id}`;

    return this.http.delete<Material>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted material id=${id}`)),
      catchError(this.handleError<Material>('deleteMaterial'))
    );
  }

  private log(message: string) {
    this.messageService.add(`MaterialService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
