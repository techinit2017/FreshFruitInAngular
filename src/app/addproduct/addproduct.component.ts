
import { AppUtility } from '../AppUtility';
import { MasterdataService } from '../_services/masterdata.service';
import { Country, ProductVariety } from '../search/search';
import { PrimaryActivitySeller, PrimaryActivityBuyer, SecurityQuestion, IUser } from '../user/user';
import { UserService } from '../user/user.service';
import { IProductAdd } from './addproduct';

import {AddProductService} from './addproduct.service';
import {Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import * as _ from 'underscore';

 @Component ({
  selector: 'app-product',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
  providers: [AddProductService, MasterdataService],
})
 export class AddProductComponent implements OnInit {
   _http: any;
   headers: Headers;
   apiBaseUrl: string;

  primaryActivitySeller: string[] = Object.keys(PrimaryActivitySeller);
  primaryActivityBuyer: string[] = Object.keys(PrimaryActivityBuyer);
  securityQuestions: string[] = Object.keys(SecurityQuestion);

  country: Country[];
  variety: ProductVariety[];
  userTypes: string[];
  years: string[] = [];
  startDate = new Date(1990, 0, 1);

  productAdd: IProductAdd;
  createuser: IProductAdd;
  createuserOutput: string;
  errorMsg: string;

  // Validators
  userForm;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(AppUtility.EMAIL_REGEX)]);

  ProductrequiredControl = new FormControl('', [
    Validators.required]);
  ProductTypequiredControl = new FormControl('', [
    Validators.required]);
  ProductInforequiredControl = new FormControl('', [
    Validators.required]);
  ProductDescequiredControl = new FormControl('', [
    Validators.required]);

  GraderequiredControl = new FormControl('', [
    Validators.required]);
  SizerequiredControl = new FormControl('', [
    Validators.required]);
   colorrequiredControl = new FormControl('', [
    Validators.required]);
   MimorderqtyrequiredControl = new FormControl('', [
    Validators.required]);
   PricerequiredControl = new FormControl('', [
    Validators.required]);
   PriceNegotiablerequiredControl = new FormControl('', [
    Validators.required]);
   MeasurementrequiredControl = new FormControl('', [
    Validators.required]);
   PackagingrequiredControl = new FormControl('', [
    Validators.required]);
   ActiverequiredControl = new FormControl('', [
    Validators.required]);

  constructor(private addProductService: AddProductService, private masterDataService: MasterdataService) {
    this.userTypes = [
      'Seller',
      'Buyer',
      'Both'
    ];

    for (var i = 1990; i <= 2030; i++) {
      this.years.push(i.toString());
    }

    const group: any = {};
    group.productrequiredControl = this.ProductrequiredControl;
    group.productTypequiredControl = this.ProductTypequiredControl;
    group.ProductInforequiredControl = this.ProductInforequiredControl;
    group.ProductDescequiredControl = this.ProductDescequiredControl;
    group.GraderequiredControl = this.GraderequiredControl;
    group.SizerequiredControl = this.SizerequiredControl;
    group.colorrequiredControl = this.colorrequiredControl;
    group.MimorderqtyrequiredControl = this.MimorderqtyrequiredControl;
    group.PricerequiredControl = this.PricerequiredControl;
    group.PriceNegotiablerequiredControl = this.PriceNegotiablerequiredControl;
    
    group.MeasurementrequiredControl = this.MeasurementrequiredControl;
    group.PackagingrequiredControl = this.PackagingrequiredControl;
    group.ActiverequiredControl = this.ActiverequiredControl;
    this.userForm = new FormGroup(group);
  }

  ngOnInit(): void {
    this.onLoad();
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

  onLoad() {
    this.productAdd = new IProductAdd();
    this.getCountries();
    this.getProductByVariety(null);
    this.primaryActivitySeller = this.primaryActivitySeller.slice(this.primaryActivitySeller.length / 2);
    this.primaryActivityBuyer = this.primaryActivityBuyer.slice(this.primaryActivityBuyer.length / 2);
    this.securityQuestions = this.securityQuestions.slice(this.securityQuestions.length / 2);
  }

  onbackClick() {
  }

  onSubmit(productAdd: IProductAdd) {
    // = new IUser();
    // this.createuser = user;
    this.addProductService.saveUser(productAdd).
      subscribe(data => this.createuserOutput = JSON.stringify(productAdd),
      err => this.errorMsg = <any>err,
      () => this.onRequestComplete());
  }

  onRequestComplete() {
    this.ngOnInit();
    console.log('Finished');
  }

  getCountries(): void {
    this.masterDataService
      .getCountries()
      .subscribe(country => this.country = country,
      err => this.errorMsg = <any>err);
  }

  getProductByVariety(productName: string): void {
    if (!productName) {
      productName = 'APPLE';
    }
    this.masterDataService
      .getProductByVariety(productName)
      .subscribe(variety => this.variety = variety,
      err => this.errorMsg = <any>err);
  }
 
   
   /**
   * Handles the change event of the input tag,
   * Extracts the image file uploaded and 
   * makes an Http request with the image file.
   */ 
  handleInputChange (event) {
    
    var image = event.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!image.type.match(pattern)) {
        console.error('File is not an image');
       
        return;
    }
    
    let endPoint = '/upload/profileImage'; // use your own API endpoint
    let headers = new Headers();
    headers.set('Content-Type', 'application/octet-stream');
    headers.set('Upload-Content-Type', image.type)

    this.makeRequest(endPoint, 'POST', image, headers).subscribe(
          response  => {this.handleSuccess(response); },
          error =>  {this.handleError(error); }
        );

  }
   
   /**
   * Makes the HTTP request and returns an Observable
   */
  private makeRequest (endPoint: string,
                        method: string, body = null,
                        headers: Headers = new Headers()): Observable<any>
 {
      let url = this.apiBaseUrl + endPoint;
      this.headers = headers;
      if (method == 'GET') {
          let options = new RequestOptions({ headers: this.headers });
          return this._http.get(url, options)
                          .map(this.extractData)
                          .catch(this.extractError);
      } else if (method == 'POST') {
          let options = new RequestOptions({ headers: this.headers });
          return this._http.post(url, body, options)
                          .map(this.extractData)
                          .catch(this.extractError);
      }
  }
  
  /**
   * Extracts the response from the API response.
   */ 
  private extractData (res: Response) {
        let body = res.json();
        return body.response || { };
    }
    
  private extractError (res: Response) {
        let errMsg = 'Error received from the API';
        return errMsg;
    }
  
  private handleSuccess(response) {
    console.log('Successfully uploaded image');
    // provide your own implementation of handling the response from API
  }
  
  private handleError(errror) {
    console.error('Error uploading image')
    // provide your own implementation of displaying the error message
  }
    
}
