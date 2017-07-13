import {IProduct} from './product';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable()
export class ProductService {
  private _url = 'assets/product.json';
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }
  /**
   * Get list of Products
   */
  getProducts(): Observable<IProduct[]> {
    return this.http.get(this._url).map((response: Response) => <IProduct[]>response.json())
      .do(data => console.log(JSON.stringify(data)))
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


