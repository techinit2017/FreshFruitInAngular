import {IUser} from './user';
import {UserService} from './user.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userlist = 'List Of Users loaded';
  iusers: IUser[];
  errorMsg: string;
  constructor(private userService: UserService) {
    /*this.result = { user: [] };
    userService.getEntries().subscribe(res => this.result = res);
    console.log(this.result);*/

  }

  ngOnInit(): void {
    this.userService.getEntries()
      .subscribe(iusers => this.iusers = iusers, err => this.errorMsg = <any>err);
  }
  /**
   * Check for Null or Empty String
   */
  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }
}
