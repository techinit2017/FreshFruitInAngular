import {AppSettings} from '../AppSettings';
import {IProduct} from '../product/product';
import { IUser } from '../user/user';
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { PageParam } from "app/_model/model";
import { IContact } from "app/contact/contact";




@Injectable()
export class ContactService {
  http: Http;
  constructor(http: Http) {
    this.http = http;
  }
   /**
   * Save
   * @param Contact Icontact
   */
  saveContact(contact:IContact) {

    const json = JSON.stringify(contact);

    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({headers: headers});
 
      return this.http.post(AppSettings.POST_CONTACT_US, json, options).map(res => res.json()).catch(this.handleError);
    }
  

  private handleError(error: Response) {
    console.error(error.status);
    // if (error.status === 404) {
    return Observable.throw(new Error(`Server error: ${error.statusText} (${error.status})`));
    // }
    // return Observable.throw(error.json().error());
  }
}
