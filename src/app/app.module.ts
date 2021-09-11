import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EditOrAddProductModalComponent } from './components/edit-or-add-product-modal/edit-or-add-product-modal.component';
import { DeleteProductModalComponent } from './components/delete-product-modal/delete-product-modal.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowProductComponent } from './components/show-product/show-product.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EditOrAddProductModalComponent,
    DeleteProductModalComponent,
    ShowProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
