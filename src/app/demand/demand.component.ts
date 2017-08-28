import { IProduct } from '../product/product';
import { ProductVariety, Country } from '../search/search';
import { IUser } from '../user/user';
import { IDemand } from './demand';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DemandService } from "app/demand/demand.service";
import { AppSettings } from "app/AppSettings";
import { AlertService } from "app/_services/alert.service";
import { PagerService } from "app/_services";
import { PageParam } from "app/_model/model";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.css'],
  providers: [DemandService, AlertService, PagerService]
})
export class DemandComponent implements OnInit {

  currentUser: IUser;

  demands: IDemand[];
  pager: any = {};
  totalCount;

  constructor(private demandService: DemandService, private alertservice: AlertService, private pagerService: PagerService) {

  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.fetch(1);
    // this.getUserDemands(this.currentUser);
    // this.getUserDemands(this.currentUser);
    // this.setPage(1);

    /*if (this.currentUser) {
      this.demandService.getDemandList(this.currentUser).then(
        result => {
          this.demands=result.demands
          this.totalCount = result.count;
        },
        error=>{
          this.alertservice.error('Error: Service unavailable');
        }
      );
       // .subscribe(demands => this.demands = demands, err => { this.alertservice.error("Error: Service Error"); }, () => this.setPage(1));
    }*/
  }



  onRequestComplete() {
    console.log('Finished');
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

  fetch(page: number) {
   this.setPagination(page);
    if (this.pager) {
      this.getUserDemands(this.currentUser);
    }
  }

  setPagination(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.totalCount, page,this.pager.pageSize);
  }



  getUserDemands(user: IUser) {

    if (user) {
      this.demandService.getDemandList(user, this.pager).then(
        result => {
          this.demands = result.demands
          this.totalCount = result.count;
          this.setPagination(this.pager.currentPage);
        },
        error => {
          this.alertservice.error('Error: Service unavailable');
        }
      );
    }

  }

  onPaginationChange(value) {
    console.log(value);
    if (value) {
      this.pager.pageSize=value;
      this.fetch(this.pager.currentPage);
    }
  }
}
