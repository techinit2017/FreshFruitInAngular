import {AppUtility} from '../AppUtility';
import { Navigation } from '../Navigation';
import {AlertService} from '../_services/alert.service';
import {MasterdataService} from '../_services/masterdata.service';
import {Country, ProductVariety} from '../search/search';
import {IUser, PrimaryActivitySeller, PrimaryActivityBuyer} from '../user/user';
import {UserService} from '../user/user.service';
import {Component, OnInit, Injectable} from '@angular/core';
import {NgForm, FormControl, Validators, Form, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MdDatepickerModule} from '@angular/material';
import { AppSettings } from "app/AppSettings";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService, MasterdataService, AlertService],
})
export class RegisterComponent implements OnInit {

  primaryActivitySeller: string[] = Object.keys(PrimaryActivitySeller);
  primaryActivityBuyer: string[] = Object.keys(PrimaryActivityBuyer);
  securityQuestions: ProductVariety[];

  country: Country[];
  variety: ProductVariety[];
  userTypes: string[];
  years: string[] = [];
  productlist: string[];
  startDate = new Date(1990, 0, 1);

  user: IUser;
  createuser: IUser;
  createuserOutput: string;
  errorMsg: string;

  // Validators
  userForm;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(AppUtility.EMAIL_REGEX)]);

  companyrequiredControl = new FormControl('', [
    Validators.required]);
  firstNamerequiredControl = new FormControl('', [
    Validators.required]);
  LastNamerequiredControl = new FormControl('', [
    Validators.required]);
  dobControl = new FormControl('', [
    Validators.required]);

  securityQuesControl = new FormControl('', [
    Validators.required]);
  securityAnsControl = new FormControl('', [
    Validators.required]);

  constructor(private userService: UserService, private masterDataService: MasterdataService,
    private router: Router, private alertService: AlertService) {
    this.userTypes = [
      'Seller',
      'Buyer',
      'Both'
    ];

    for (var i = 1990; i <= 2030; i++) {
      this.years.push(i.toString());
    }

    const group: any = {};
    group.companyrequiredControl = this.companyrequiredControl;
    group.firstNamerequiredControl = this.firstNamerequiredControl;
    group.LastNamerequiredControl = this.LastNamerequiredControl;
    // group.dobControl = this.dobControl;
    group.securityQuesControl = this.securityQuesControl;
    group.securityAnsControl = this.securityAnsControl;
    this.userForm = new FormGroup(group);
  }

  ngOnInit(): void {
    this.onLoad();
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

  onLoad() {
    this.user = new IUser();
    this.getCountries();
    this.getProducts(AppSettings.CONST_FRUIT);
    this.getProductByVariety(null);
    this.primaryActivitySeller = this.primaryActivitySeller.slice(this.primaryActivitySeller.length / 2);
    this.primaryActivityBuyer = this.primaryActivityBuyer.slice(this.primaryActivityBuyer.length / 2);
    this.getSecurityQuestion(AppSettings.CONST_SECRET);
  }

  onbackClick() {
  }

  onSubmit(user: IUser) {
    // = new IUser();
    // this.createuser = user;
    //    this.userService.saveUser(user).
    //      subscribe(data => this.createuserOutput = JSON.stringify(user),
    //      err => this.errorMsg = <any>err,
    //      () => this.onRequemp());


    // = new IUser();
    // this.createuser = user;
    this.userService.saveUser(user).
      subscribe(data => {
          this.createuserOutput = JSON.stringify(user);
          this.router.navigate([Navigation.LOGIN]);
      }, error => {
        this.alertService.error('Error: Username or Email already exist');
      }, () => this.onRequestComplete());
  }

  onRequestComplete() {
   
    console.log('Finished');
  }

  getCountries(): void {
    this.masterDataService
      .getCountries()
      .subscribe(country => this.country = country,
      err => this.errorMsg = <any>err);
  }
  getProducts(productType: string): void {
    this.masterDataService
      .getProductNames(productType)
      .subscribe(name => this.productlist = name,
      err => this.errorMsg = <any>err);
  }

  getProductByVariety(type: string): void {
    if (!type) {
      type = 'APPLE';
    }
    this.masterDataService
      .getProductByVariety(type)
      .subscribe(variety => this.variety = variety,
      err => this.errorMsg = <any>err);
  }

  getSecurityQuestion(type: string): void {
    if (!type) {
      type = AppSettings.CONST_SECRET;
    }
    this.masterDataService
      .getProductByVariety(type)
      .subscribe(variety => { this.securityQuestions = variety;
      console.log(this.securityQuestions)}, error =>{
        console.log('Error: Service not available');
      } );
      
  }

  onReset(){
    // clear all select
    this.user.currentOpCountryArray = null;
    this.user.countryOfOperationArray=null;
    this.user.secretQuestion =null;
    this.user.primaryActivity=null;
    this.user.operationSince =null;
    this.user.typeFruitVarietyArray = null;
    this.user.typeFruit=null;
    this.user.country =null;
    this.user.userType = null;
  }

}
