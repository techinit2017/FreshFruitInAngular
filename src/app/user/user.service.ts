import {AppSettings} from '../AppSettings';
import {IUser} from './user';
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class UserService {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  getEntries(): Observable<IUser[]> {
    return this.http.get(AppSettings.GET_USERS).map((response: Response) => <IUser[]>response.json())
      .do(data => console.log(JSON.stringify(data)))
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
  saveUser(value: any) {
    const json = JSON.stringify(value);
    const param = json;
    const headers = new Headers({'Content-Type': 'application/json'});
     // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({headers: headers});
    return this.http.post(AppSettings.POST_USER_SAVE, param, options).map(res => res.json()).catch(this.handleError);
  }
}
