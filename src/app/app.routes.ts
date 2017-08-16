import {AddProductComponent} from './addproduct/addproduct.component';
import {Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {ContactComponent} from './contact/contact.component';
import {DatatableComponent} from './datatable/datatable.component';
import {ErrorComponent} from './error/error.component';
import {ForgetpasswordComponent} from './forgetpassword/forgetpassword.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ProductComponent} from './product/product.component';
import {RegisterComponent} from './register/register.component';
import {SearchComponent} from './search/search.component';
import {TestComponent} from './test/test.component';
import {UserComponent} from './user/user.component';
import {DemandComponent} from './demand/demand.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'Home',
    component: HomeComponent
  },
  {
    path: 'Search',
    component: SearchComponent
  },
  {
    path: 'Product',
    component: ProductComponent
  },
  {
    path: 'User',
    component: UserComponent
  },
  {
    path: 'Contact',
    component: ContactComponent
  }, {
    path: 'Test',
    component: TestComponent
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: 'forgetPassword',
    component: ForgetpasswordComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'demand',
    component: DemandComponent
  },
  {
    path: 'addProduct',
    component: AddProductComponent
  },
  {path: '**', component: ErrorComponent}


]
