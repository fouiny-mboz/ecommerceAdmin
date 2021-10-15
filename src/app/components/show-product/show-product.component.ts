import { Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { Response } from 'src/app/models/response';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css'],
})
export class ShowProductComponent implements OnInit {
  //Décarations des valiables
  @Input() products: Product[];
  productModalOpen = false;
  selectedProduct: Product;
  delete = false;
  productToBeDelete: Product;
  file: File;
  progress = 0;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {}

  onEdit(product: Product): void {
    this.productModalOpen = true;
    this.selectedProduct = product;
  }

  onDelete(product: Product): void {
    this.delete = true;
    this.productToBeDelete = product;
  }

  addProduct(): void {
    this.selectedProduct = undefined;
    this.productModalOpen = true;
  }

  handleFinish(event) {
    if (event && event.product) {
      let product = event.product ? event.product : null;
      this.file = event.file ? event.file : null;
      console.log(product);
      if (this.selectedProduct) {
        //edit product
        product.idProduct = this.selectedProduct.idProduct;
        this.editProductToServer(product);
      } else {
        this.addProductToServer(product);
      }
    }
    this.productModalOpen = false;
  }

  uploadImage(event) {
    switch (event.type) {
      case HttpEventType.Sent:
        console.log('Requète envoyé avec succès');
        break;
      case HttpEventType.UploadProgress:
        this.progress = Math.round((event.loaded / event.total) * 100); // pourcentage de la progression
        break;
      case HttpEventType.Response:
        console.log(event.body); //Affichache de la valuer
        setTimeout(() => {
          this.progress = 0;
        }, 1500);
    }
  }

  editProductToServer(product) {}

  addProductToServer(product) {}

  updateProducts(product) {
    // update frontend
    const index = this.products.findIndex(
      (p) => p.idProduct == product.idProduct
    );
    product.Category = product.category;
    this.products = [
      ...this.products.slice(0, index),
      product,
      ...this.products.slice(index + 1),
    ];
  }
}
