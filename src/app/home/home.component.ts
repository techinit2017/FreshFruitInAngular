
import { SearchService } from '../search/search.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MdMenuTrigger } from '@angular/material';
import {SearchComponent} from '../search/search.component';
import { Router } from '@angular/router';
import { AlertService } from "app/_services/alert.service";
import { ISearch } from "app/search/search";
import { IProduct } from "app/product/product";
import { AppSettings } from "app/AppSettings";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent implements OnInit{
  iProduct: IProduct[];
  loading = false;
  count;
  constructor(private router: Router){

  }

  ngOnInit(): void {
   
  }

  submit(value: string){
    console.log(value);
    if(value){
      this.router.navigate(['/Search',value]);
     
    }

  }
}
 export class MyComponent {
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }
}
