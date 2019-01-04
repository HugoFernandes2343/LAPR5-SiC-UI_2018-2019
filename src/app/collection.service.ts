import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, of} from "rxjs";
import {Collection} from "./model/collection";
import {Product} from "./model/product";
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class CollectionService {

   // private collectionUrl = 'https://lapr5-gc.azurewebsites.net/api/Collection';

    private collectionUrl = 'https://localhost:5001/api/Collection';

    constructor(private  http: HttpClient, private messageService: MessageService) {
    }

    /** GET Collections **/
    getCollections(): Observable<Collection[]> {
        return this.http.get<Collection[]>(this.collectionUrl)
            .pipe(
                tap(_ => this.log('fetched collections')),
                catchError(this.handleError('getCollections', []))
            );
    }

    /** GET Collection by id **/
    getCollection(id: number): Observable<Collection> {
        const url = `${this.collectionUrl}/${id}`;
        return this.http.get<Collection>(url)
            .pipe(
                tap(_ => this.log('fetched collection')),
                catchError(this.handleError<Collection>(`getCollection`))
            );
    }

    addCollection(collection: Collection): Observable<Collection> {
        return this.http.post<Collection>(this.collectionUrl, collection, httpOptions)
            .pipe(
                tap((collection: Collection) => this.log(`added collection`)),
                catchError(this.handleError<Collection>('addCollection'))
            );
    }

    updateCollection(collection: Collection): Observable<Collection> {
        const url = `${this.collectionUrl}/${collection.CollectionId}`;
        return this.http.put(url, JSON.stringify(collection), httpOptions)
            .pipe(
                tap(_ => this.log(`updated collection`)),
                catchError(this.handleError<any>('updateCollection'))
            );
    }

    deleteCollection(collection: Collection): Observable<Collection> {
        const url = `${this.collectionUrl}/${collection.CollectionId}`;
        return this.http.delete<Collection>(url, httpOptions)
            .pipe(
                tap(_ => this.log(`deleted Collection`)),
                catchError(this.handleError<Collection>('deleteCollection'))
            );
    }

    addProductToCollection(collectionId: number, productId: number): Observable<Collection> {
        const url = `${this.collectionUrl}/${collectionId}/Product/${productId}`;
        return this.http.put(url, httpOptions)
            .pipe(
                tap(_ => this.log(`added product to collection`)),
                catchError(this.handleError<any>('addProductToCollection'))
            );
    }

    ///TODO: remove prod from collection

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
        this.messageService.add(`CatalogService: ${message}`);
    }
}
