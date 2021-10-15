import { Category } from 'src/app/models/category';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-edit-or-add-category-modal',
  templateUrl: './edit-or-add-category-modal.component.html',
  styleUrls: ['./edit-or-add-category-modal.component.css'],
})
export class EditOrAddCategoryModalComponent implements OnInit {
  categoryForm: FormGroup;
  selectedCategory: Category;
  constructor(
    public CategoryService: CategoriesService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.categoryForm = this.formBuilder.group({
      name_category: ['', Validators.required],
      icon: ['', Validators.required],
    });
  }

  ngOnInit() {}

  handleFinish() {
    this.CategoryService.addCategories(this.categoryForm.value);
    this.router.navigate(['/categories']);
  }
}
