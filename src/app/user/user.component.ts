import {IUser} from './user';
import {UserService} from './user.service';
import {Component, OnInit, Injectable} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService],
})
export class UserComponent implements OnInit {

  isAdd: boolean;
  userlist = 'Users list';
  iusers: IUser[];
  createuserOutput: string;
  errorMsg: string;
  constructor(private userService: UserService) {
    console.log('inside user component constructor');
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
  }
  
  onbackClick() {
    this.isAdd = false;
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    this.userService.saveUser(f.value).
      subscribe(data => this.createuserOutput = JSON.stringify(f.value),
      err => this.errorMsg = <any>err,
      () =>  this.onRequestComplete());
  }
  
  onRequestComplete() {
    this.ngOnInit();
    console.log('Finished');
  }
}
