import { PagerService } from './PagerService';
import {IProduct} from './product';
import {ProductService} from './product.service';
import {Component, OnInit, Input} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import * as _ from 'underscore';
import { IUser } from "app/user/user";

 @Component ({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService],
})
export class ProductComponent implements OnInit {

  prodlist = 'Product';
  errorMsg:  string;
  postData: string;
  @Input() product: IProduct;
  currentUser: IUser;
   
  constructor(private http: Http, private _productService: ProductService, private pagerService: PagerService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  
    // array of all items to be paged
    private allItems: any[];
 
    // pager object
    pager: any = {};
 
    // paged items
    pagedItems: any[];
 
    ngOnInit() {
        // get dummy data
        this._productService.getProducts()
        .subscribe(data => 
            {
      
          this.allItems = data;
                // initialize to page 1
                this.setPage(1);
            });
    }
 
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);
 
        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
  
}
