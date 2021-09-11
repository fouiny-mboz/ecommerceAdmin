import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { Response } from 'src/app/models/response';



@Component({
  selector: 'app-edit-or-add-product-modal',
  templateUrl: './edit-or-add-product-modal.component.html',
  styleUrls: ['./edit-or-add-product-modal.component.css']
})
export class EditOrAddProductModalComponent implements OnInit, OnDestroy {

  @Input() product: Product;
  @Output() finish = new EventEmitter();
  productForm: FormGroup;
  categories: Category[];
  categorySub: Subscription;
  idCategory=1;
  file: File;

  constructor(private fb: FormBuilder, private categoriesService: CategoriesService) {
    this.productForm = fb.group({
      productInfos: fb.group({
        name:['', Validators.required],
        description:['',Validators.required],
        price:['', Validators.required],
        stock:['', Validators.required        ]

      }),
      illustration: fb.group({
        image:['',Validators.required],
      })
    })
   }


   get isProductInfosInvalid(): boolean{
     return this.productForm.get('productInfos').invalid;
   }

   get isIllustrationInvalid(): boolean{
     return this.productForm.get('illustration').invalid;
   }

   handleCancel(){
     this.finish.emit();
     this.close();
   }

   handleFinish(){
    const product = {
      ...this.productForm.get('productInfos').value,
      ...this.productForm.get('illustration').value,
      category:this.idCategory,
    }
    if(this.file){
      product.image = this.file.name;
    }
    this.finish.emit(product);
    this.close();
   }

   close(){
     this.productForm.reset();
     this.idCategory =1;
   }

   detecteFiles(event){
      this.file =event.target.files[0];
   }

  ngOnInit(): void {
    this.categorySub = this.categoriesService.getCategory().subscribe(
      (response: Response)=>{
         this.categories =response.result;
         console.log( this.categories);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  ngOnDestroy():void{
    this.categorySub.unsubscribe();
  }

  selectCategory(id:number){
    this.idCategory = id;
  }

}
