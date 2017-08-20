import {AppSettings} from '../AppSettings';
import {Country, ProductVariety} from '../search/search';
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MasterdataService {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }


  getCountries(): Observable<Country[]> {
    return this.http.get(AppSettings.GET_COUNTRY_INFO).map((response: Response) => <Country[]>response.json())
      .do(data => {
        if (AppSettings.IS_DEV) {
          console.log(JSON.stringify(data))
        }
      })
      .catch(this.handleError);
  }

  getProductByVariety(productName: string): Observable<ProductVariety[]> {
    return this.http.get(AppSettings.GET_PRODUCTS_VARIETY + productName).map((response: Response) => <ProductVariety[]>response.json())
      .do(data => {
        if (AppSettings.IS_DEV) {
          console.log(JSON.stringify(data))
        }
      })
      .catch(this.handleError);
  }
  getProductNames(type: string): Observable<string[]> {
    return this.http.get(AppSettings.GET_LOV_BY_TYPE + '/' + type).map((response: Response) => <string[]>response.json())
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
    // return Observable.throw(new Error('Oops!! Some Problem bad luck !!'));
  }

}
