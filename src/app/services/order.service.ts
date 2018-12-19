import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';
import { Product } from '../data/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  /**
   * NODEJS METHODS
   */
  createOrder(product: Product): Observable<any> {
    var order_products = this.getProductsIdsJson(product);
    var email = localStorage.getItem("email");

    let headers = new HttpHeaders({
      'x-access-token': localStorage.getItem("token")
    });

    let data = { user_email: email, order_products: order_products };

    return this.http.post<any>("https://localhost:8081/orders/", data, { headers });
  }

  getProductsIdsJson(product: Product) {
    var child_prods = product.prod_childProds;
    var ids = [];
    console.log(product);
    ids.push(product.prod_dotnetid);
    child_prods.forEach(element => {
      ids.push(element.prod_dotnetid);
    });
    return this.parseToJson(ids);
  }

  parseToJson(ids: any) {
    var string = '{'
    var length = ids.length;

    for (var i = 0; i < length; i++) {
      if (i == length - 1) {
        string += ids[i] + '}';
      }
      else {
        string += ids[i] + ',';
      }
    }

    return string;
  }

  getOrders(): Observable<any> {
    let headers = new HttpHeaders({
      'x-access-token': localStorage.getItem("token")
    });

    return this.http.get<any>("https://localhost:8081/orders/", { headers });
  }
  getProduct(id: any): Observable<any> {
    let headers = new HttpHeaders({
      'x-access-token': localStorage.getItem("token")
    });
    
    return this.http.get<any>("https://localhost:8081/products/productitem/" + id, { headers });
  }


}
