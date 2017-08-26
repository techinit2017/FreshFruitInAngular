import {AppSettings} from '../AppSettings';
import {IUser} from '../user/user';
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { of } from 'rxjs/observable/of';
/**
 * Function to do Access autorization for buyer & Seller
 * @param user 
 */
function doAuthorization( user: IUser){
  console.log(user);
  if(!this.user){
    
    return false;
  }else if(this.user && this.user.userType !='Admin' && this.user.aprroved!=1){
    
    return false;
  }
  console.log('End of Do Authorization')
  return true;
}

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
      this.user =user;
     
     // let autoFlag = doAuthorization(this.user);
      // console.log(autoFlag);
      if(this.user && this.user.userType !='Admin' && this.user.aprroved!=1){
        console.log('[Login is not authorized]' + JSON.stringify(this.user));
         return Observable.throw(new Error('Login is not authorized'));
      }
      else if (user) {
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


  validateRecoveryIdentify(user: IUser): Observable<IUser> {
    const userJson = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
   return this.http.post(AppSettings.POST_FORGET_PASSWORD_VALIDATE,userJson,options).map((response: Response) => <IUser>response.json())
      .do(data => {
        if (AppSettings.IS_DEV) {
          console.log(JSON.stringify(data))
        }
      }) .catch(this.handleError);
  
  }
}
