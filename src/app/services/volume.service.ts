import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../data/product';

@Injectable({
    providedIn: 'root',
})

export class VolumeService{

    constructor(){}

    checkIfNewProductFits(parent: Product, newComponent: Product){

    }
}