import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../data/product';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})


export class ProductService {


  constructor(private http: HttpClient, private loginService: LoginService) { }



  /**
   * ======================
   * NODEJS METHODS
   * ====================== 
   */
  getAllProducts(): Observable<Product[]> {
    let headers = new HttpHeaders({
      'x-access-token': localStorage.getItem("token")
    });

    return this.http.get<Product[]>("https://localhost:8081/products", { headers });
  }

  getProductById(id: number): Observable<Product> {
    let headers = new HttpHeaders({
      'x-access-token': localStorage.getItem("token")
    });
    return this.http.get<Product>("https://localhost:8081/products" + "/" + id, { headers });
  }


  /**
   * ======================
   * DOTNET METHODS
   * ====================== 
   */

   /**
    * Returns a dotnet product
    * @param id product id
    */
  getDotNetProductById(id: number): Observable<any> {
    return this.http.get<any>("https://lapr5-gc.azurewebsites.net/api/product" + "/" + id);
  }

  /**
   * REturns all the materials in the dotnet Server
   */
  getDotnetMaterials(): Observable<any> {
    return this.http.get<any>("https://lapr5-gc.azurewebsites.net/api/material/");
  }

  /**
   * Returns the material in the dotnet Server
   * @param id material id
   */
  getDotnetMaterialById(id: number): Observable<any> {
    return this.http.get<any>("https://lapr5-gc.azurewebsites.net/api/materialfinish/" + id);
  }

  /**
   * Returns the all the categories in the dotnet server
   */
  getDotnetCategories(): Observable<any> {
    return this.http.get<any>("https://lapr5-gc.azurewebsites.net/api/category/1");
  }

  editDotnetProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>("https://lapr5-gc.azurewebsites.net/api/product" + "/" + id,
      product);
  }

  createDotnetProduct(product: any): Observable<any> {
    return this.http.post("https://lapr5-gc.azurewebsites.net/api/product", product);
  }

  deleteDotnetMaterial(productId: number, materialId: number): Observable<any> {
    return this.http.request('DELETE', "https://lapr5-gc.azurewebsites.net/api/material/productmaterial", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { MaterialId: materialId, ProductId: productId }
    });
  }

  createDotnetMaterialProduct(productId: number, materialId: number): Observable<any> {
    return this.http.post<any>("https://lapr5-gc.azurewebsites.net/api/material/productmaterial", {ProductId: productId, MaterialId: materialId});
  }

  createDotnetDimension(
    height: number, heightMax: number, width: number, widthMax: number, depth: number, depthMax: number): Observable<any> {
    var dimension = {
      Height: height, HeightMax: heightMax,
      Width: width, WidthMax: widthMax,
      Depth: depth, DepthMax: depthMax
    }

    return this.http.post<any>("https://lapr5-gc.azurewebsites.net/api/dimension", dimension);
  }

  deleteDotnetProduct(id: number): Observable<any> {
    return this.http.delete<any>("https://lapr5-gc.azurewebsites.net/api/product/" + id);
  }

  addDotnetComponent(parentId: number, childId: number): Observable<any> {
    return this.http.put<any>("https://lapr5-gc.azurewebsites.net/api/product/addComponent/" + parentId + "/" + childId, {});
  }
}
