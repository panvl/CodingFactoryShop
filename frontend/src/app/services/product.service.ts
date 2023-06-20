import { Injectable } from '@angular/core';
import { Product } from '../shared/models/Product';
import { sample_products } from 'src/data';
import { HttpClient } from '@angular/common/http';
import {
  PRODUCTS_BY_ID_URL,
  PRODUCTS_BY_SEARCH_URL,
  PRODUCTS_URL,
} from '../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_URL);
  }
  getAllBySearchTerm(searchTerm: string) {
    return this.http.get<Product[]>(PRODUCTS_BY_SEARCH_URL + searchTerm);
  }
  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(PRODUCTS_BY_ID_URL + productId);
  }
}
