import {AppSettings} from '../AppSettings';
import {AlertService} from '../_services/alert.service';
import {IUser} from '../user/user';
import {UserService} from '../user/user.service';
import { DatatableService } from './datatable.service';
import {Component, OnInit, Injectable} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
  providers: [DatatableService, AlertService],
})
export class DatatableComponent implements OnInit {

  user = [];
  userCount = 0;

  isAdd: boolean;
  iusers: IUser[];
  createuserOutput: string;
  errorMsg: string;
  loading: boolean;

  constructor(private dataService: DatatableService, private alertService: AlertService, private route: ActivatedRoute) {
    this.loading = true;
  }

  ngOnInit(): void {
  }

  reloadItems(params) {
    this.loading = true;
    this.dataService.query(params).then(result => {
      this.user = result.user;
      this.userCount = result.count;
      this.loading = false;
    }, error => {
      if (AppSettings.IS_DEV) {
        console.log(error);
      }
      this.alertService.error('Error: Service unavailable');
      this.loading = false;
    });


  }

  rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.name);
  }

  rowDoubleClick(rowEvent) {
    alert('Double clicked: ' + rowEvent.row.item.name);
  }

  rowTooltip(item) {return item.jobTitle; }


  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }

  onAddClick() {
    this.isAdd = true;
  }

  onbackClick() {
    this.isAdd = false;
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    this.dataService.saveUser(f.value).
      subscribe(data => this.createuserOutput = JSON.stringify(f.value),
      err => this.errorMsg = <any>err,
      () => this.onRequestComplete());
  }

  onRequestComplete() {
    // this.ngOnInit();
    console.log('Finished');
  }
}
