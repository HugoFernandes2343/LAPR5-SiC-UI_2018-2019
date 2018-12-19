import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Category } from '../data/category';

@Injectable({
    providedIn: 'root'
})

export class CategoryService{

    private categoryURL = 'https://arqsiweb-app.azurewebsites.net/api/category'

    constructor(private http: HttpClient, ){ }

    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoryURL);
    }
}