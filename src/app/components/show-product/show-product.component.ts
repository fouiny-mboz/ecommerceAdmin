import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { Response } from 'src/app/models/response';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  @Input() products: Product[];
  productModalOpen= false;
  selectedProduct: Product;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
  }

  onEdit(product: Product):void{
    this.productModalOpen = true;
    this.selectedProduct = product;

  }

  onDelete(product: Product):void{

  }

  addProduct():void{
    this.productModalOpen = true;
  }

  handleFinish(product){
    if(product){
      console.log(product);
      if(this.selectedProduct){
        //edit product
      }else{
        this.productService.addProducts(product).subscribe(
          (data)=>{
            if(data.Status ==200)
            //Update frontend
            product.idProduct = data.args.lastInsertId
            this.products.push(product);
          }
        )
      }
    }
    this.productModalOpen = false;
  }

}

