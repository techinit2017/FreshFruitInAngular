import { Component, OnInit } from '@angular/core';
import { AlertService } from "app/_services/alert.service";

import { Routes, Router } from '@angular/router';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import { ContactService } from "app/contact/contact.service";
import { IContact } from "app/contact/contact";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ ContactService, AlertService]
})
export class ContactComponent implements OnInit{

  contact:IContact;
  contactForm;
  requiredControl = new FormControl('', [
    Validators.required]);
  
  ngOnInit(){
    
    this.onLoad();
  }

  onLoad()
  {
    this.contact=new IContact();
  }

    constructor(private contactService:ContactService, private alertService: AlertService,private router: Router){
      const group: any = {};
      group.requiredControl = this.requiredControl;
      this.contactForm = new FormGroup(group);
    
    }

    onRequestComplete() {
      
      console.log('Finished');
      this.router.navigate(['/Home']);
    }

    onSubmit(contact: IContact){
      console.log('Enter');
      this.contactService.saveContact(contact).
       subscribe(data => {},
       err => {this.alertService.error("Error: Create or Update Error");},
       () => this.onRequestComplete());
     }

}
