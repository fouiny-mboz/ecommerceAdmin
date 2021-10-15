import { CdsModule } from '@cds/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EditOrAddProductModalComponent } from './components/edit-or-add-product-modal/edit-or-add-product-modal.component';
import { DeleteProductModalComponent } from './components/delete-product-modal/delete-product-modal.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowProductComponent } from './components/show-product/show-product.component';
import { ShowCategoryComponent } from './components/show-category/show-category.component';
import { EditOrAddCategoryModalComponent } from './components/edit-or-add-category-modal/edit-or-add-category-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditOrAddProductModalComponent,
    DeleteProductModalComponent,
    ShowProductComponent,
    ShowCategoryComponent,
    EditOrAddCategoryModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClarityModule,
    CdsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
