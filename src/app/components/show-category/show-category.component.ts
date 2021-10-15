import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Category } from './../../models/category';
import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css'],
})
export class ShowCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categoryModalOpen = false;
  selectedCategory: Category;
  categories: Category[];

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

  ngOnInit(): void {
    this.CategoryService.getCategory().subscribe((res: Category[]) => {
      this.categories = res;
    });
  }

  onEdit(category: Category): void {
    this.categoryModalOpen = true;
    this.selectedCategory = category;
  }

  onDelete(Category) {
    if (confirm('Are you sure to delete ' + Category.name)) {
      this.CategoryService.deleteCategory(Category);
    }
  }

  handleFinish() {
    this.CategoryService.addCategories(this.categoryForm.value);
    this.router.navigate(['/categories']);
  }
}
