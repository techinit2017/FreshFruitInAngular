import { IUser } from '../user/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sellerproduct',
  templateUrl: './sellerproduct.component.html',
  styleUrls: ['./sellerproduct.component.css']
})
export class SellerproductComponent implements OnInit {
 currentUser: IUser;
  constructor() { }

  ngOnInit() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
