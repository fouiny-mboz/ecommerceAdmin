import { Observable } from 'rxjs';
import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private fireCat: AngularFirestore) {}

  getCategory(): Observable<Category[]> {
    return this.fireCat.collection<Category>('categories').valueChanges();
  }

  getCategoryDoc(idCategory) {
    return this.fireCat
      .collection('category-collection')
      .doc(idCategory)
      .valueChanges();
  }

  addCategories(category: Category) {
    return new Promise<any>((resolve, reject) => {
      this.fireCat
        .collection('category-collection')
        .add(category)
        .then(
          (response) => {
            console.log(response);
          },
          (error) => reject(error)
        );
    });
  }

  editCategory(category: Category, idCategory) {
    return this.fireCat
      .collection('categoryt-collection')
      .doc(idCategory)
      .update({
        name: category.name,
        icon: category.icon,
      });
  }

  deleteCategory(category) {
    return this.fireCat
      .collection('category-collection')
      .doc(category.idCategory)
      .delete();
  }
}
