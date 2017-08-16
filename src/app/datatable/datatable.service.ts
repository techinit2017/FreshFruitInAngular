import {AppSettings} from '../AppSettings';
import { Sort } from '../_model/model';

import {IUser} from '../user/user';
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers, ResponseOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

function paramsToQueryString(params: any) {
  let sort = new Sort();
  /**
   * {
  "direction": "DESC",
  "property": ["firstName","lastName"],
  "pageNumber": 2,
  "pageSize": 4
}
   * 
   * 
   * 
   */
  if (params.limit != null) {
    sort.pageSize = params.limit;
    // result.push(['pageSize', params.limit]);
  }
  if (params.offset != null && params.limit != null) {
    sort.pageNumber = (params.offset / params.limit);
    //  result.push(['pageNumber', params.offset])  
    sort.property.push('firstName');
    sort.direction = 'ASC';
  }

  if (params.sortBy != null) {
    sort.property.push(params.sortBy);
    //  result.push(['property', params.sortBy]);
  }
  if (params.sortAsc != null) {
    sort.direction = params.sortAsc ? 'ASC' : 'DESC';
    // result.push(['direction', params.sortAsc ? 'ASC' : 'DESC']);
  }

  // return result.map(param => param.join('=')).join('&');
  return sort;
}

@Injectable()
export class DatatableService {

  constructor(private http: Http) {
  }

  query(params: any) {
    let result = paramsToQueryString(params);

    const userJson = JSON.stringify(result);
    console.log(userJson);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(AppSettings.GET_PAGINATED_USERS, userJson, options).toPromise()
            .then((resp: Response) => ({
                user: resp.json(),
              count: Number(resp.headers.get('X-Total-Count'))
            }));
  }
  
  private handleError(error: Response) {
    console.error(error.status);
    // if (error.status === 404) {
    return Observable.throw(new Error(`Server error: ${error.statusText} (${error.status})`));
    // }
    // return Observable.throw(error.json().error());
    // return Observable.throw(new Error('Oops!! Some Problem bad luck !!'));
  }
  saveUser(value: any) {
    const json = JSON.stringify(value);
    const param = json;
    const headers = new Headers({'Content-Type': 'application/json'});
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers});
    return this.http.post(AppSettings.POST_USER_SAVE, param, options).map(res => res.json()).catch(this.handleError);
  }

}
