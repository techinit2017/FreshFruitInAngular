import {MasterdataService} from '../../_services/masterdata.service';
import { Country, ProductVariety } from '../../search/search';
import { IDemand, Grade, ProductSize, ProductColor, MeasurementType, ProductGrade } from '../demand';
import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { DemandService } from "app/demand/demand.service";
import { IUser } from "app/user/user";
import { AlertService } from "app/_services/alert.service";
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { AppSettings } from "app/AppSettings";


@Component({
  selector: 'adddemand',
  templateUrl: './adddemand.component.html',
  styleUrls: ['./adddemand.component.css'],
  providers: [MasterdataService, DemandService, AlertService]
})
export class AdddemandComponent implements OnInit {
  private sub: any;
  demand: IDemand;
  currentUser: IUser;
  demandForm;
  productList: String[];
  
  country: Country[];
 // city: City[];
  variety: ProductVariety[];
  productSize: string[] = Object.keys(ProductSize);
  productColor: string[] = Object.keys(ProductColor);
  measurementType: string[] = Object.keys(MeasurementType);
  productGrade: string[] = Object.keys(ProductGrade);
  grades: Grade[];
  requiredControl = new FormControl('', [
    Validators.required]);
  constructor(public masterDataService: MasterdataService, public demandService: DemandService, private alertService: AlertService,private route: ActivatedRoute, private router: Router) {
    const group: any = {};
    group.requiredControl = this.requiredControl;
    this.demandForm = new FormGroup(group);
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.onLoad();
    let demandId: number;
    this.sub = this.route.params.subscribe(params => {
      demandId = +params['id']; // (+) converts string 'id' to a number
     
      if (demandId) {
        this.getDemandById(demandId);
        // this.productAdd.id = productId;
        // this.getProductById(productId);
      }
      //if()
      // In a real app: dispatch action to load the details here.
    });
  }

  onbackClick() {
  }
  onLoad() {
    //this.productSize = this.productSize.slice(this.productSize.length / 2);
    //this.productColor = this.productColor.slice(this.productColor.length / 2);
    //this.measurementType = this.measurementType.slice(this.measurementType.length /2);
    //this.productGrade = this.productGrade.slice(this.productGrade.length /2);
    this.demand = new IDemand();
    this.demand.userProfile = this.currentUser;
    this.getCountries();
    //this.getCityByCountry(null);
    this.getProducts(AppSettings.CONST_FRUIT);
    this.getProductByVariety(null);
    //this.getGrades();
  }
  getCountries(): void {
    this.masterDataService
      .getCountries()
      .subscribe(country => this.country = country,
      err => {this.alertService.error("Error: Service Error");});
  }

  /**getCityByCountry(country: string): void {
    if (!country) {
      country = 'India';
    }
    this.masterDataService
      .getCityByCountry(country)
      .subscribe(city => this.city = city,
      err => this.errorMsg = <any>err);
  }**/

  private change(value: any) {
    console.log('Selected value is: ', value);
    this.getProductByVariety(value);

  }

  getProductByVariety(productName: string): void {
    if (!productName) {
      productName = 'APPLE';
    }
    this.masterDataService
      .getProductByVariety(productName)
      .subscribe(variety => this.variety = variety,
      err => {this.alertService.error("Error: Service Error");});
  }

  getProducts(productType: string): void {
    this.masterDataService
      .getProductNames(productType)
      .subscribe(name => this.productList = name,
      err => {this.alertService.error("Error: Service Error");});
  }


  getGrades(): void {
    this.demandService
      .getGradeNames()
      .subscribe(grades => this.grades = grades,
      err => {this.alertService.error("Error: Service Error");});
  }

  onRequestComplete() {
    this.router.navigate(['/demand']);
    console.log('Finished');
  }

   onSubmit(demand: IDemand){
   this.demandService.saveDemand(demand).
    subscribe(data => {},
    err => {this.alertService.error("Error: Create or Update Error");},
    () => this.onRequestComplete());
  } 

  getDemandById(demandid: number) {
    this.demandService.fetchDemand(demandid).
    subscribe(data => {
      console.log(data);
      this.demand = data; 
      this.demand.varietyArray=this.demand.variety.split(','); 
      this.demand.countryArray=this.demand.country.split(',');
       
    },
    err =>{
    this.alertService.error('Error:Demand not found');
    }
    );
  }

}
