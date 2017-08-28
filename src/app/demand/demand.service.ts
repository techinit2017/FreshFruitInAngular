import {AppSettings} from '../AppSettings';
import {IProduct} from '../product/product';
import { IUser } from '../user/user';
import {IDemand, Grade} from './demand';
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { PageParam } from "app/_model/model";

@Injectable()
export class DemandService {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  /**
   * Get Demand list based on User
   */
  getDemandList(user: IUser,pager: any) {
    console.log(pager);
    let pageParam = new PageParam(pager.currentPage-1,pager.pageSize);
    if(!user){
      return;
    }
    if(user.userType.match('Admin')){

    return this.http.get(AppSettings.GET_ALL_DEMANDS).toPromise()
    .then((resp: Response) => ({
      demands: resp.json(),
      count: Number(resp.headers.get('RECORD_COUNT')),
      // test:resp.json()
    }));
   /* return this.http.get(AppSettings.GET_ALL_DEMANDS).map((response: Response) => <IDemand[]>response.json())
      .do(data => {
        if (AppSettings.IS_DEV) {
          console.log(JSON.stringify(data))
        }
      })
      .catch(this.handleError);*/
     }else {
      
      const pageParamJson = JSON.stringify(pageParam);
      console.log(pageParamJson);
      const headers = new Headers({'Content-Type': 'application/json'});
  
      const options = new RequestOptions({headers: headers});
      return this.http.post(AppSettings.POST_USER_DEMAND + '/' + user.id,pageParamJson,options).toPromise()
      .then((resp: Response) => ({
        demands: resp.json(),
        count: Number(resp.headers.get('RECORD_COUNT'))
      }));
     /* return this.http.post(AppSettings.POST_USER_DEMAND + '/' + user.id,pageParamJson,options).map((response: Response) => <IDemand[]>response.json())
      .do(data => {
        if (AppSettings.IS_DEV) {
          console.log(JSON.stringify(data))
        }
      })
      .catch(this.handleError);*/
    }
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
  getUserDemand(user: IUser): Observable<IProduct[]> {
    return this.http.get(AppSettings.SEARCH_PRODUCTS).map((response: Response) => <IProduct[]>response.json())
      .do(data => {
        if (AppSettings.IS_DEV) {
          console.log(JSON.stringify(data))
        }
      })
      .catch(this.handleError);
  }

  getGradeNames(): Observable<Grade[]> {
    return this.http.get('AppSettings.GET_GRADE_NAMES').map((response: Response) => <Grade[]>response.json())
      .do(data => {
        if (AppSettings.IS_DEV) {
          console.log(JSON.stringify(data))
        }
      })
      .catch(this.handleError);
  }

  
  fetchDemand(demandid: number){
    return this.http.get(AppSettings.GET_DEMAND_BY_ID + '/'+demandid ).map((response: Response) => <IDemand>response.json())
    .do(data => {
      if (AppSettings.IS_DEV) {
        console.log(JSON.stringify(data))
      }
    })
    .catch(this.handleError);
  }
  /**
   * Save or Update Demand
   * @param demand IDemand
   */
  saveDemand(demand: IDemand) {
    if(demand.countryArray){
      demand.country = demand.countryArray.toString();
    }

    if(demand.varietyArray){
      demand.variety = demand.varietyArray.toString();
    }
    const json = JSON.stringify(demand);
    
    console.log(json);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    if(!demand.id || demand.id==0){
      return this.http.post(AppSettings.POST_DEMAND_SAVE, json, options).map(res => res.json()).catch(this.handleError);
    }else{
    return this.http.put(AppSettings.PUT_DEMAND_SAVE, json, options).map(res => res.json()).catch(this.handleError);
    }
  }




  private handleError(error: Response) {
    console.error(error.status);
    // if (error.status === 404) {
    return Observable.throw(new Error(`Server error: ${error.statusText} (${error.status})`));
    // }
    // return Observable.throw(error.json().error());
  }
}
