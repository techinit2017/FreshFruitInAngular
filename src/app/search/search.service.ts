import { AppSettings } from '../AppSettings';
import { IProduct } from '../product/product';
import {Injectable} from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class SearchService {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  /**
   * Get list of Products
   */
  getProducts(query: string): Observable<IProduct[]> {
    return this.http.get(AppSettings.GET_PRODUCTS).map((response: Response) => <IProduct[]>response.json())
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
