import {AppSettings} from '../AppSettings';
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  constructor(private http: Http) {}
  login(username: string, password: string) {
    const userJson = JSON.stringify({userName: username, password: password});
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(AppSettings.USER_AUTH_SERVICE, userJson, options).map((response: Response) => {
      // login successful if there's a jwt token in the response
      let user = response.json();
      console.log(user);
      if (user) {
           console.log('[TOKEN]' + user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    });

  }
  private handleError(error: Response) {
    console.error(error.status);
    // if (error.status === 404) {
    return Observable.throw(new Error(`Server error: ${error.statusText} (${error.status})`));
    // }
    // return Observable.throw(error.json().error());
    // return Observable.throw(new Error('Oops!! Some Problem bad luck !!'));
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
