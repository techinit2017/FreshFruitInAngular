import {IProduct} from '../product/product';
import {ProductVariety, Country} from '../search/search';
import {IUser} from '../user/user';
import {IDemand} from './demand';
import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { DemandService } from "app/demand/demand.service";
import { AppSettings } from "app/AppSettings";
import { AlertService } from "app/_services/alert.service";

@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.css'],
  providers: [ DemandService, AlertService]
})
export class DemandComponent implements OnInit {

  currentUser: IUser;
 
  demands: IDemand[];
  

  constructor(private demandService: DemandService, private alertservice : AlertService) {
    
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser){
      this.demandService.getDemandList(this.currentUser)
      .subscribe(demands => this.demands = demands, err => {this.alertservice.error("Error: Service Error");}, () => console.log('finished'));
    }
  }

  
  
  onRequestComplete() {
    console.log('Finished');
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

}
