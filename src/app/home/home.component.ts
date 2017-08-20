
import { SearchService } from '../search/search.service';
import {Component, ViewChild} from '@angular/core';
import { MdMenuTrigger } from '@angular/material';
import {SearchComponent} from '../search/search.component';


 @ Component({
  selector: 'grid-list-dynamic-example',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
 
  submit(value: string){
    console.log(value);
  }
}
 export class MyComponent {
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }
}
