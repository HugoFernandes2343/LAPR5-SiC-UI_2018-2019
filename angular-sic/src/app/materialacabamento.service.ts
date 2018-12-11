import { Injectable } from '@angular/core';
import { MaterialAcabamento } from './materialacabamento/materialacabamento';
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

export class MaterialacabamentoService {

  private materialAcabamentoUrl = 'https://arqsiedgarcatarinaluis.azurewebsites.net/api/MaterialAcabamento';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    getMateriaisAcabamentos(): Observable<MaterialAcabamento[]> {
    return this.http.get<MaterialAcabamento[]>(this.materialAcabamentoUrl)
    .pipe(
      tap(_ => this.log('fetched materiaisAcabamentos')),
      catchError(this.handleError('getMateriaisAcabamentos', []))
    );
  }
  
  getMaterialAcabamento(id: number): Observable<MaterialAcabamento> {
    const url = `${this.materialAcabamentoUrl}/${id}`;
    return this.http.get<MaterialAcabamento>(url).pipe(
      tap(_ => this.log(`fetched materialAcabamento id=${id}`)),
      catchError(this.handleError<MaterialAcabamento>(`getMaterialAcabamento id=${id}`))
    );
  }

  updateMaterialAcabamento(materialAcabamento: MaterialAcabamento): Observable<any> {
    const url = `${this.materialAcabamentoUrl}/${materialAcabamento.id}`;
    return this.http.put(url, materialAcabamento, httpOptions).pipe(
      tap(_ => this.log(`updated materialAcabamento id=${materialAcabamento.id}`)),
      catchError(this.handleError<any>('updateMaterialAcabamento'))
    );
  }

  addMaterialAcabamento(materialAcabamento: MaterialAcabamento): Observable<MaterialAcabamento> {
    return this.http.post<MaterialAcabamento>(this.materialAcabamentoUrl, materialAcabamento, httpOptions).pipe(
      tap((material: MaterialAcabamento) => this.log(`added materialAcabamento w/ id=${materialAcabamento.id}`)),
      catchError(this.handleError<MaterialAcabamento>('addMaterialAcabamento'))
    );
  }

  deleteMaterialAcabamento(materialAcabamento: MaterialAcabamento | number): Observable<MaterialAcabamento> {
    const id = typeof materialAcabamento === 'number' ? materialAcabamento : materialAcabamento.id;
    const url = `${this.materialAcabamentoUrl}/${id}`;

    return this.http.delete<MaterialAcabamento>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted materialAcabamento id=${id}`)),
      catchError(this.handleError<MaterialAcabamento>('deleteMaterialAcabamento'))
    );
  }

  private log(message: string) {
    this.messageService.add(`MaterialAcabamentoService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}
