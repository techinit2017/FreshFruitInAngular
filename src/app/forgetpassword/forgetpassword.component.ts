import {AppSettings} from '../AppSettings';
import {AlertService} from '../_services/alert.service';
import {LoginService} from '../login/login.service';
import {SecurityQuestion, IUser} from '../user/user';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
  providers: [LoginService, AlertService],
})
export class ForgetpasswordComponent implements OnInit {
  // data Objects
  identity: string;
  user: IUser;
  securityQuestions: string[] = Object.keys(SecurityQuestion);
  // validation Component
  isValidUser: boolean;

  loading = false;


  constructor(private loginService: LoginService, private alertService: AlertService) {
    this.securityQuestions = this.securityQuestions.slice(this.securityQuestions.length / 2);
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

}
