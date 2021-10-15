import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private fireServices: AngularFirestore) {}

  getProducts(): Observable<Product[]> {
    return this.fireServices
      .collection<Product>('product-collection')
      .valueChanges();
  }

  getProductDoc(idProduct) {
    return this.fireServices
      .collection('product-collection')
      .doc(idProduct)
      .valueChanges();
  }

  addProducts(product: Product) {
    return new Promise<any>((resolve, reject) => {
      this.fireServices
        .collection('product-collection')
        .add(product)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => reject(error)
        );
    });
  }

  editProduct(product: Product, idProduct) {
    return this.fireServices
      .collection('product-collection')
      .doc(idProduct)
      .update({
        name: product.name,
        description: product.description,
        price: product.price,
        Category: product.Category,
        stock: product.stock,
        image: product.image,
        time: product.time,
      });
  }

  deleteProduct(product) {
    return this.fireServices
      .collection('product-collection')
      .doc(product.idProduct)
      .delete();
  }
}
