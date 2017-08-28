import { AppUtility } from '../../AppUtility';
import { AlertService } from '../../_services/alert.service';
import { MasterdataService } from '../../_services/masterdata.service';
import { IProduct } from '../../product/product';

import { ProductService } from '../../product/product.service';
import { Country, ProductVariety } from '../../search/search';
import { PrimaryActivitySeller, PrimaryActivityBuyer, IUser } from '../../user/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RequestOptions } from '@angular/http';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { AppSettings } from "app/AppSettings";

@Component({
  selector: 'addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
  providers: [ProductService, MasterdataService, AlertService],
})
export class AddproductComponent implements OnInit, OnDestroy {

  private sub: any;
  primaryActivitySeller: string[] = Object.keys(PrimaryActivitySeller);
  primaryActivityBuyer: string[] = Object.keys(PrimaryActivityBuyer);


  country: Country[];
  variety: ProductVariety[];
  userTypes: string[];
  years: string[] = [];
  productlist: string[];
  startDate = new Date(1990, 0, 1);

  productAdd: IProduct;
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

  constructor(private productService: ProductService, private masterDataService: MasterdataService, private alertService: AlertService, private route: ActivatedRoute, private router: Router) {
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
    /*const id: Observable<any> = this.route.params.map(p => p.id);
    this.productAdd = new IProduct();
    id.subscribe(arg =>{
      if(arg){
        this.productAdd.userProfile.id = arg;
      }
    });*/
    this.onLoad();
    this.productAdd = new IProduct();
    let userId: number, productId: number;
    this.sub = this.route.params.subscribe(params => {
      userId = +params['id']; // (+) converts string 'id' to a number
      productId = +params['pid']; // (+) converts string 'id' to a number
      this.productAdd.userProfile.id = userId;
      if (productId) {
        this.productAdd.id = productId;
        this.getProductById(productId);
      }
      //if()
      // In a real app: dispatch action to load the details here.
    });

   
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

  onLoad() {
    this.getCountries();
    this.getProductByVariety(null);
    this.getProducts(AppSettings.CONST_FRUIT);
    this.primaryActivitySeller = this.primaryActivitySeller.slice(this.primaryActivitySeller.length / 2);
    this.primaryActivityBuyer = this.primaryActivityBuyer.slice(this.primaryActivityBuyer.length / 2);

  }

  onbackClick() {
  }

  onSubmit(productAdd: IProduct) {
    // = new IUser();
    // this.createuser = user;
    if (productAdd.userProfile.id) {

      this.productService.save(productAdd).
        subscribe(data => {

        },
        err => {
          this.alertService.error('Error: Product Creation');
        },
        () => this.onRequestComplete());
    }
  }

  onRequestComplete() {
    //this.ngOnInit();
    console.log('Finished');
    this.router.navigate(['/sellerProduct']);
  }

  getCountries(): void {
    this.masterDataService
      .getCountries()
      .subscribe(country => this.country = country,
      err => {
        this.alertService.error('Error: Service Unavailable');
      });
  }

  getProductByVariety(productName: string): void {
    if (!productName) {
      productName = 'APPLE';
    }
    this.masterDataService
      .getProductByVariety(productName)
      .subscribe(variety => this.variety = variety,
      err => {
        this.alertService.error('Error: Service Unavailable');
      });
  }
  getProducts(productType: string): void {
    this.masterDataService
      .getProductNames(productType)
      .subscribe(name => this.productlist = name,
      err => {
        this.alertService.error('Error: Service nUnavailable');
      });
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(
      data => {
        this.productAdd = data;
        if(this.productAdd.country){
          this.productAdd.countryArray=this.productAdd.country.split(',');
        }
        console.log(this.productAdd);
      }, err => {
        this.alertService.error('Error: Service Unavailable');
      }, () => {

        //this.router.na
      }

    );
  }

  /**
  * Handles the change event of the input tag,
  * Extracts the image file uploaded and 
  * makes an Http request with the image file.
  */
  hndleInputChange(event) {

    var image = event.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!image.type.match(pattern)) {
      console.error('File is not an image');

      return;
    }

    let endPoint = '/upload/profileImage'; // use your own API endpoint
    this.productService.makeRequest(endPoint, 'POST', image).subscribe(
      data => {
      }, error => {
        this.alertService.error('Error: Image Upload');
      }, () => this.onRequestComplete()
    );

  }

  /**
  * Makes the HTTP request and returns an Observable
  */
  //  private makeRequest (endPoint: string,
  //                        method: string, body = null,
  //                        headers: Headers = new Headers()): Observable<any>
  // {
  //      let url = this.apiBaseUrl + endPoint;
  //      this.headers = headers;
  //      if (method == 'GET') {
  //          let options = new RequestOptions({ headers: this.headers });
  //          return this._http.get(url, options)
  //                          .map(this.extractData)
  //                          .catch(this.extractError);
  //      } else if (method == 'POST') {
  //          let options = new RequestOptions({ headers: this.headers });
  //          return this._http.post(url, body, options)
  //                          .map(this.extractData)
  //                          .catch(this.exactError);
  //      }
  //  }

  /**
   * Extracts the respnse from the API response.
   */
  //  private extractData (res: Response) {
  //        let body = res.json();
  //      turn body.response || { };
  //    }

  private extractError(res: Response) {
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onChange(value) {
    console.log(value);
    if (value) {
      this.getProductByVariety(value);
    }
  }

}
