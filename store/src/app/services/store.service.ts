import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }
  private http = inject(HttpClient);

  getAllProducts(limit='12',sort='desc', category?:string):Observable<Array<Product>>{
    return this.http.get<Array<Product>>(
      `${env.STORE_BASE_URL}/products${
        category ? '/category/' + category:''
      }?sort=${sort}&limit=${limit}`
    )

  }

  getAllCategories():Observable<Array<string>>{
    return this.http.get<Array<string>>(
      `${env.STORE_BASE_URL}/products/categories`
    )
  }
}
