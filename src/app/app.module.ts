import { MasterdataService } from './_services/masterdata.service';
import { AddProductComponent } from './addproduct/addproduct.component';
import { AddProductService } from './addproduct/addproduct.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule, FormControlDirective, FormGroupDirective } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdButtonModule, MdNativeDateModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { ContactComponent } from './contact/contact.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { ErrorComponent } from './error/error.component';
import { ProductService } from './product/product.service';
import { TestComponent } from './test/test.component';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './alert/alert.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { PagerService } from './product/PagerService';
import { RegisterComponent } from './register/register.component';
import { DatatableComponent } from './datatable/datatable.component';
import { DemandComponent } from './demand/demand.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ProductComponent,
    SearchComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    ErrorComponent,
    TestComponent,
    AlertComponent,
    ForgetpasswordComponent,
    RegisterComponent,
    DemandComponent,
    AddProductComponent,
    DatatableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MdNativeDateModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes, { useHash: true, enableTracing: false, initialNavigation: 'enabled' }),
  ],
  providers: [FormControlDirective, FormGroupDirective, PagerService, MasterdataService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
