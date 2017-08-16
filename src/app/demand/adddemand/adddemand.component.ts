import {MasterdataService} from '../../_services/masterdata.service';
import {Country, ProductVariety} from '../../search/search';
import {IDemand} from '../demand';
import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'adddemand',
  templateUrl: './adddemand.component.html',
  styleUrls: ['./adddemand.component.css'],
  providers: [MasterdataService]
})
export class AdddemandComponent implements OnInit {
  errorMsg: any;
  demand: IDemand;
  demandForm;
  productList: String[];
  country: Country[];
  variety: ProductVariety[];
  requiredControl = new FormControl('', [
    Validators.required]);
  constructor(public masterDataService: MasterdataService) {
    const group: any = {};
    group.requiredControl = this.requiredControl;
    this.demandForm = new FormGroup(group);
  }

  ngOnInit() {
    this.onLoad();
  }

  onbackClick() {
  }
  onLoad() {
    this.demand = new IDemand();
    this.getCountries();
    this.getProductByVariety(null);
    this.getProducts();
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

  getProducts(): void {
    this.masterDataService
      .getProductNames()
      .subscribe(name => this.productList = name,
      err => this.errorMsg = <any>err);
  }

  onRequestComplete() {
    this.ngOnInit();
    console.log('Finished');
  }

}
