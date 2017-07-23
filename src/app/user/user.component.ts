import {IUser} from './user';
import {UserService} from './user.service';
import {Component, OnInit, Injectable} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService],
})
export class UserComponent implements OnInit {

  userlist = 'List Of Users loaded';
  iusers: IUser[];
  createuserOutput: string;
  errorMsg: string;
  constructor(private userService: UserService) {
    /*this.result = { user: [] };
    userService.getEntries().subscribe(res => this.result = res);
    console.log(this.result);*/
  }

  ngOnInit(): void {
    this.userService.getEntries()
      .subscribe(iusers => this.iusers = iusers, err => this.errorMsg = <any>err, () => console.log('finished'));
  }
  /**
   * Check for Null or Empty String
   */
  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
    
    
    
  }
  onTestPost() {
    this.userService.onTestPost().
      subscribe(data => this.createuserOutput = JSON.stringify(data),
       err => this.errorMsg = <any>err,
      () => console.log('Finished'))
  }
}
