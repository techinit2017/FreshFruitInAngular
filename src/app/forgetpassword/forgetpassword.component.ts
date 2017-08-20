import {AppSettings} from '../AppSettings';
import {AlertService} from '../_services/alert.service';
import {LoginService} from '../login/login.service';
import {IUser} from '../user/user';
import {Component, OnInit} from '@angular/core';
import { MasterdataService } from "app/_services/masterdata.service";
import { ProductVariety } from "app/search/search";

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
  providers: [LoginService, AlertService, MasterdataService],
})
export class ForgetpasswordComponent implements OnInit {
  // data Objects
  identity: string;
  user: IUser;
  securityQuestions: ProductVariety[];
  // validation Component
  isValidUser: boolean;

  loading = false;


  constructor(private loginService: LoginService, private alertService: AlertService, private masterDataService: MasterdataService) {
    
  }

  ngOnInit() {
  }

  validateRecoveryIdentify(userName: string) {
    if (AppSettings.IS_DEV) {
      console.log('USER_NAME[' + userName + ']');
    }
    this.loading = true;
    this.loginService.validateRecoveryIdentify(userName)
      .subscribe(
      data => {
        if (AppSettings.IS_DEV) {
          // console.log(this.returnUrl);
        }
        // this.router.navigate([this.returnUrl]);
        this.isValidUser = true;
        this.user = data;
      },
      error => {
        if (AppSettings.IS_DEV) {
          console.log('Error in validateRecoveryIdentify');
        }
        this.alertService.error('Error: Username/Email is incorrect');
        this.loading = false;
      });
  }

  onRequestComplete() {
    this.ngOnInit();
    console.log('Finished');
  }

  getSecurityQuestion(type: string): void {
    if (!type) {
      type = AppSettings.CONST_SECRET;
    }
    this.masterDataService
      .getProductByVariety(type)
      .subscribe(variety => { this.securityQuestions = variety}, error =>{
        this.alertService.error('Error: Service not available');
      } );
      
  }
}
