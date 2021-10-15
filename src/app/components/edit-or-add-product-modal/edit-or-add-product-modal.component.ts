import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { Response } from 'src/app/models/response';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-edit-or-add-product-modal',
  templateUrl: './edit-or-add-product-modal.component.html',
  styleUrls: ['./edit-or-add-product-modal.component.css'],
})
export class EditOrAddProductModalComponent
  implements OnInit, OnDestroy, OnChanges
{
  @Input() product: Product;
  @Output() finish = new EventEmitter();
  productForm: FormGroup;
  categories: Category[] = [];
  categorySub: Subscription;
  idCategory = 1;
  file: File;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private fileStorage: AngularFireStorage
  ) {
    this.productForm = fb.group({
      productInfos: fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        stock: ['', Validators.required],
      }),
      illustration: fb.group({
        image: [null, Validators.required],
      }),
    });
  }

  get isProductInfosInvalid(): boolean {
    return this.productForm.get('productInfos').invalid;
  }

  get isIllustrationInvalid(): boolean {
    if (this.product) {
      return false;
    }
    return this.productForm.get('illustration').invalid;
  }

  handleCancel() {
    this.finish.emit();
    this.close();
  }

  handleFinish() {
    let product = {
      ...this.productForm.get('productInfos').value,
      ...this.productForm.get('illustration').value,
      category: this.idCategory,
      oldImage: null,
    };
    if (this.file) {
      product.image = this.file.name;
    } else {
      product.image = this.product.oldImage;
    }
    this.finish.emit({ product: product, file: this.file ? this.file : null }); // recupération des valeurs de champs
    // de product et file
    this.close();
  }

  close() {
    this.productForm.reset();
    this.idCategory = 1;
  }

  detecteFiles(event) {
    this.file = event.target.files[0];
  }

  updateForm(product: Product) {
    this.productForm.patchValue({
      productInfos: {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      },
    });
    product.oldImage = product.image; // sauvegarde du nom de l'ancien image
    this.selectCategory(product.Category);
  }

  ngOnInit(): void {
    this.categoriesService.getCategory().subscribe((c: Category[]) => {
      this.categories = c;
    });
  }

  ngOnChanges(): void {
    if (this.product) {
      this.updateForm(this.product);
    }
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }

  selectCategory(id: number) {
    this.idCategory = id;
  }
}
