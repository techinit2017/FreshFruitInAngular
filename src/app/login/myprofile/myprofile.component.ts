import { Component, OnInit } from '@angular/core';
import { IUser, PrimaryActivitySeller, PrimaryActivityBuyer } from "app/user/user";
import { NgForm } from '@angular/forms';
import { UserService } from "app/user/user.service";
import { AlertService } from "app/_services/alert.service";
import { MasterdataService } from "app/_services/masterdata.service";
import { ProductVariety, Country } from "app/search/search";
import { AppSettings } from "app/AppSettings";

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css'],
  providers: [UserService,AlertService,MasterdataService],
})
export class MyprofileComponent implements OnInit {
  myProfile: IUser;
  link: string;
  
  primaryActivitySeller: string[];
  primaryActivityBuyer: string[];
  securityQuestions: ProductVariety[];

  country: Country[];
  variety: ProductVariety[];
  userTypes: string[];
  years: string[] = [];
  productlist: string[];
  startDate = new Date(1990, 0, 1);


  constructor(private userService: UserService, private alertService: AlertService, private masterDataService: MasterdataService) { }

  ngOnInit() {
    this.myProfile = JSON.parse(localStorage.getItem('currentUser'));
    this.link = 'PERSONAL_PROFILE';
    this.getCountries();
   
  }

  onLinkClick(link: string) {
    
    this.alertService.clear();
    this.link = link;
    if(link =='PROFESSIONAL_PROFILE'){
      this.LoadLov();
      this.onConvertToArray();
    }
    
  }
  onConvertToArray(){
    if(this.myProfile.typeFruitVariety){
      this.myProfile.typeFruitVarietyArray = this.myProfile.typeFruitVariety.split(',');
    }
    if(this.myProfile.currentOpCountry){
      this.myProfile.currentOpCountryArray = this.myProfile.currentOpCountry.split(',');
    }

    if(this.myProfile.countryOfOperation){
      this.myProfile.countryOfOperationArray = this.myProfile.countryOfOperation.split(',');
    }
    for (var i = 1990; i <= 2030; i++) {
      this.years.push(i.toString());
    }
    
   

   

  }

  LoadLov(){
    this.getCountries();
    this.getProducts(AppSettings.CONST_FRUIT);
    this.getProductByVariety(null);
    this.primaryActivitySeller =Object.keys(PrimaryActivitySeller).slice(Object.keys(PrimaryActivitySeller).length / 2);
    this.primaryActivityBuyer = Object.keys(PrimaryActivityBuyer).slice(Object.keys(PrimaryActivitySeller).length / 2);
    this.getSecurityQuestion(AppSettings.CONST_SECRET);
    
  }


  changePassword(f: NgForm) {
    
    if(!f.value.confirmPassword || !f.value.password){
      this.alertService.error('Error: Please Enter Password & Confirm Password');
    }
    else if(f.value.confirmPassword!=f.value.password){
      this.alertService.error('Error: Password & Confirm Password mismatch');
    }else{
      this.myProfile.password=f.value.password;
      if (this.myProfile) {
        this.userService.resetPassword(this.myProfile).subscribe(data => {
          this.myProfile = data;
          localStorage.setItem('currentUser', JSON.stringify(this.myProfile));
          this.alertService.success('Password Update & Please Re-Login');
        }, error => {
          this.alertService.error('Error:Password Update error');
        });
      }
    }
    
    
  }

  updateProfile() {
    console.log(this.myProfile);
    if (this.myProfile) {
      this.userService.saveUser(this.myProfile).subscribe(data => {
        this.myProfile = data;
        this.onConvertToArray();
        localStorage.setItem('currentUser', JSON.stringify(this.myProfile));
        this.alertService.success('Profile Updated Successfully');
      }, error => {
        this.alertService.error('Error: Profile Update');
      });
    }
  }


  getCountries(): void {
    this.masterDataService
      .getCountries()
      .subscribe(country => this.country = country,
      err => this.alertService.error('Error: Service unavailable'));
  }
  getProducts(productType: string): void {
    this.masterDataService
      .getProductNames(productType)
      .subscribe(name => this.productlist = name,
      err =>  this.alertService.error('Error: Service unavailable'));
  }

  getProductByVariety(type: string): void {
    if (!type) {
      type = 'APPLE';
    }
    this.masterDataService
      .getProductByVariety(type)
      .subscribe(variety => this.variety = variety,
      err =>  this.alertService.error('Error: Service unavailable'));
  }

  getSecurityQuestion(type: string): void {
    if (!type) {
      type = AppSettings.CONST_SECRET;
    }
    this.masterDataService
      .getProductByVariety(type)
      .subscribe(variety => { this.securityQuestions = variety;
      }, error =>{
        console.log('Error: Service not available');
      },() =>{} );
      
  }

  onReset(){
    // clear all select
    this.myProfile.currentOpCountryArray = null;
    this.myProfile.countryOfOperationArray=null;
    this.myProfile.secretQuestion =null;
    this.myProfile.primaryActivity=null;
    this.myProfile.operationSince =null;
    this.myProfile.typeFruitVarietyArray = null;
    this.myProfile.typeFruit=null;
    this.myProfile.country =null;
    this.myProfile.userType = null;
  }

}
