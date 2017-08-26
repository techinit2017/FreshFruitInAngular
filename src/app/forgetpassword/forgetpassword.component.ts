import { AppSettings } from '../AppSettings';
import { AlertService } from '../_services/alert.service';
import { LoginService } from '../login/login.service';
import { IUser } from '../user/user';
import { Component, OnInit } from '@angular/core';
import { MasterdataService } from "app/_services/masterdata.service";
import { ProductVariety } from "app/search/search";
import { UserService } from "app/user/user.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
  providers: [LoginService, AlertService, MasterdataService, UserService],
})
export class ForgetpasswordComponent implements OnInit {
  // data Objects
  // identity: string;
  user: IUser;
  securityQuestions: ProductVariety[];
  // validation Component
  isValidUser: boolean;

  loading = false;


  constructor(private loginService: LoginService, private alertService: AlertService, private masterDataService: MasterdataService, private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    this.getSecurityQuestion(AppSettings.CONST_SECRET);
    this.user = new IUser();
  }

  validateRecoveryIdentify() {
    if (AppSettings.IS_DEV) {
      console.log('USER_NAME[' + this.user.userName + ']');
    }
    this.loading = true;
    this.loginService.validateRecoveryIdentify(this.user)
      .subscribe(
      data => {
        if (AppSettings.IS_DEV) {
          // console.log(this.returnUrl);
        }
        this.alertService.success('Enter new Password');
        this.isValidUser = true;
        this.user = data;
      },
      error => {
        if (AppSettings.IS_DEV) {
          console.log('Error in validateRecoveryIdentify');
        }
        this.alertService.error('Error: Invalid inputs. Please correct ');
        this.loading = false;
      });
  }

  onRequestComplete() {

    console.log('Finished');
  }

  getSecurityQuestion(type: string): void {
    if (!type) {
      type = AppSettings.CONST_SECRET;
    }
    this.masterDataService
      .getProductByVariety(type)
      .subscribe(variety => { this.securityQuestions = variety }, error => {
        this.alertService.error('Error: Service not available');
      });

  }

  onsubmit() {
    if (this.user.password != this.user.confirmPassword) {
      this.alertService.error('Error: Password & Confirm Password not Matching');
    } else {

      this.userService.resetPassword(this.user).subscribe(data => {
        this.router.navigate(['/Login']);
      },
        error => {
          this.alertService.error('Error: Password Update error');
        });
    }
  }
}
