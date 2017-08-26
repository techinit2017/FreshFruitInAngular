import {AppSettings} from '../AppSettings';
import {IProduct} from './product';
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable()
export class ProductService {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }
  /**
   * Get list of Products
   */
  getProducts(): Observable<IProduct[]> {
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
  getProductById(id:number): Observable<IProduct> {
    return this.http.get(AppSettings.GET_PRODUCT_BY_ID +"/" + id).map((response: Response) => <IProduct[]>response.json())
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
  /**
   * Method to Save or Update product
   * @param product IProduct 
   */
  save(product: IProduct) {
       if (product.countryArray) {
        product.country = product.countryArray.toString();
         // user.productionCountryArray = null;
       }

       if(!product.imagePath){
         product.imagePath = 'assets/resources/apple.png';
       }
    //    if (user.sellingMarketsArray) {
    //      user.sellingMarkets = user.sellingMarketsArray.toString();
    //      // user.sellingMarketsArray = null;
    //    }
    //    if (user.productProducedArray) {
    //      user.productProduced = user.productProducedArray.toString();
    //      // user.productProducedArray = null;
    //    }

    console.log(product);
    
    const json = JSON.stringify(product);
    const param = json;
    const headers = new Headers({'Content-Type': 'application/json'});
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers});
    if(!product.id || product.id ==0){
    return this.http.post(AppSettings.POST_PRODUCT, param, options).map(res => res.json()).catch(this.handleError);
    }else{
      return this.http.put(AppSettings.PUT_PRODUCT, param, options).map(res => res.json()).catch(this.handleError);
    }
  }

  /**
  * Makes the HTTP request and returns an Observable
  */
  public makeRequest(endPoint: string,
    method: string, body = null): Observable<any> {
    let headers = new Headers();
    headers.set('Content-Type', 'application/octet-stream');
    headers.set('Upload-Content-Type', body.type)
    let url = endPoint;
    // this.headers = headers;
    if (method == 'GET') {
      let options = new RequestOptions({headers: headers});
      return this.http.get(url, options)
        .map(res => res.json())
        .catch(this.handleError);
    } else if (method == 'POST') {
      let options = new RequestOptions({headers: headers});
      return this.http.post(url, body, options)
        .map(res => res.json())
        .catch(this.handleError);
    }
  }



}


