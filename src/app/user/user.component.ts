import {AppUtility} from '../AppUtility';
import {MasterdataService} from '../_services/masterdata.service';
import {Country, ProductVariety} from '../search/search';
import {IUser, PrimaryActivitySeller, PrimaryActivityBuyer, SecurityQuestion} from './user';
import {UserService} from './user.service';
import {Component, OnInit, Injectable} from '@angular/core';
import {NgForm, FormControl, Validators, Form, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MdDatepickerModule} from '@angular/material';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, MasterdataService],
})
export class UserComponent implements OnInit {
  // data Objects
  iusers: IUser[];
  primaryActivitySeller: string[] = Object.keys(PrimaryActivitySeller);
  primaryActivityBuyer: string[] = Object.keys(PrimaryActivityBuyer);
  securityQuestions: string[] = Object.keys(SecurityQuestion);

  country: Country[];
  variety: ProductVariety[];
  userTypes: string[];
  years: string[] = [];
  productlist: string[];
  startDate = new Date(1990, 0, 1);

  user: IUser;
  createuser: IUser;
  isAdd: boolean;
  userlist = 'Users list';

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

  constructor(private userService: UserService, private masterDataService: MasterdataService) {
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
    this.isAdd = false;
    this.userService.getEntries()
      .subscribe(iusers => this.iusers = iusers, err => this.errorMsg = <any>err, () => console.log('finished'));
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

  onAddClick() {
    this.isAdd = true;
    this.user = new IUser();
    this.getCountries();
    this.getProducts();
    this.getProductByVariety(null);
    this.primaryActivitySeller = this.primaryActivitySeller.slice(this.primaryActivitySeller.length / 2);
    this.primaryActivityBuyer = this.primaryActivityBuyer.slice(this.primaryActivityBuyer.length / 2);
    this.securityQuestions = this.securityQuestions.slice(this.securityQuestions.length / 2);
  }

  onbackClick() {
    this.isAdd = false;
  }

  onSubmit(user: IUser) {
    // = new IUser();
    // this.createuser = user;
    this.userService.saveUser(user).
      subscribe(data => this.createuserOutput = JSON.stringify(user),
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
  getProducts(): void {
    this.masterDataService
      .getProductNames()
      .subscribe(name => this.productlist = name,
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
}
