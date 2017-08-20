import { Injectable } from '@angular/core';
import {AppSettings} from '../AppSettings';
import {IProduct} from '../product/product';
import { IUser } from '../user/user';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { PageParam } from "app/_model/model";

@Injectable()
export class SellerproductService {

  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  /**
   * Get list of Products
   */
  getProducts(query: string): Observable<IProduct[]> {
    return this.http.get(AppSettings.GET_PRODUCTS).map((response: Response) => <IProduct[]>response.json())
      .do(data => {
        if (AppSettings.IS_DEV) {
          console.log(JSON.stringify(data))
        }
      })
      .catch(this.handleError);
  }

  /**
  * Get list of Products
  */
  getSellerProduct(user: IUser): Observable<IProduct[]> {
    //console.log(user);
    let pageParam = new PageParam(0,100);
    const pageParamJson = JSON.stringify(pageParam);
    console.log(pageParamJson);
    const headers = new Headers({'Content-Type': 'application/json'});
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers});
    return this.http.post(AppSettings.GET_SELLER_PRODUCTS + '/' +user.id,pageParamJson,options).map((response: Response) => <IProduct[]>response.json())
      .do(data => {
        if (AppSettings.IS_DEV) {
          console.log(JSON.stringify(data))
        }
      })
      .catch(this.handleError);
  }



  private handleError(error: Response) {
    console.error(error.status);
    // if (error.status === 404) {
    return Observable.throw(new Error(`Server error: ${error.statusText} (${error.status})`));
    // }
    // return Observable.throw(error.json().error());
  }

}
