import { IUser } from './user';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class UserService {
  private _userurl= 'http://localhost:8082/users';
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }

  getEntries(): Observable<IUser[]> {
    return this.http.get(this._userurl).map((response: Response) => <IUser[]> response.json())
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

}
