import {AppSettings} from '../AppSettings';
import {IProduct} from '../product/product';
import {ISearch} from './search';
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

function getSearchJsonObject(searchObj: ISearch) {
   Object.keys(searchObj).forEach((key) => {
     if(!searchObj[key]){
      delete searchObj[key];
     }
   });
  let searchJsonObject = new ISearch();
  searchJsonObject = searchObj;
  if (searchObj.pageNumber == null) {
    searchJsonObject.pageNumber = 0;
  }

  if (searchObj.pageSize == null) {
    searchJsonObject.pageSize = 100;
  }

  if(searchObj.pricedlimit && searchObj.pricedlimit=='>=' && searchObj.price){
    searchJsonObject.priceAbove = searchObj.price.toString();
  }

  if(searchObj.pricedlimit && searchObj.pricedlimit=='<=' && searchObj.price){
    searchJsonObject.priceBelow = searchObj.price.toString();
  }
 



  return searchJsonObject;

}


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
  doSearch(searchObj: ISearch): Observable<IProduct[]> {
    return this.http.get(AppSettings.SEARCH_PRODUCTS).map((response: Response) => <IProduct[]>response.json())
      .do(data => {
        if (AppSettings.IS_DEV) {
          console.log(JSON.stringify(data))
        }
      })
      .catch(this.handleError);
  }

  getSearchProduct(searchObj: ISearch) {
    searchObj = getSearchJsonObject(searchObj);

    const json = JSON.stringify(searchObj);
    console.log(json);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(AppSettings.SEARCH_PRODUCTS, json, options).toPromise()
      .then((resp: Response) => ({
        products: resp.json(),
        count: Number(resp.headers.get('RECORD_COUNT'))
      }));
  }



  private handleError(error: Response) {
    console.error(error.status);
    // if (error.status === 404) {
    return Observable.throw(new Error(`Server error: ${error.statusText} (${error.status})`));
    // }
    // return Observable.throw(error.json().error());
  }
}
