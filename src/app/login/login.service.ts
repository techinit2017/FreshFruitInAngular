import {AppSettings} from '../AppSettings';
import {IUser} from '../user/user';
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LoginService {
  user: IUser;
  constructor(private http: Http) {}
  login(username: string, password: string) {
    const userJson = JSON.stringify({userName: username, password: password});
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
    return this.http.post(AppSettings.USER_AUTH_SERVICE, userJson, options).map((response: Response) => {
      // login successful if there's a jwt token in the response
      let user = response.json();

      if (user) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    });

  }
  private handleError(error: Response) {
    if (AppSettings.IS_DEV) {
      console.error(error);
      console.error(error.status);
    }
    return Observable.throw(new Error(`Server error: ${error.statusText} (${error.status})`));
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }


  validateRecoveryIdentify(username: string): Observable<IUser> {
   return this.http.get(AppSettings.USER_GET_BY_USER_NAME + username).map((response: Response) => <IUser>response.json())
      .do(data => {
        if (AppSettings.IS_DEV) {
          console.log(JSON.stringify(data))
        }
        //  this.user = data;
      }) .catch(this.handleError);
    
    // console.log(this.user);
    /* if (!this.user) {
      user = this.http.get(AppSettings.USER_GET_BY_EMAIL + username + '/').map((response: Response) => <IUser>response.json())
        .do(data => {
          if (AppSettings.IS_DEV) {
            console.log(JSON.stringify(data))
          }
            this.user = data;
        })
        .catch(this.handleError);
    }

    return user; */


  }
}
