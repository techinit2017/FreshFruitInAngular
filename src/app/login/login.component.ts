import {AppSettings} from '../AppSettings';
import {AlertService} from '../_services/alert.service';
import {LoginService} from './login.service';
import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, AlertService],
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  isLoginSuccess = false;
  constructor(private route: ActivatedRoute,
    private router: Router, private loginService: LoginService, private alertService: AlertService) {

  }

  ngOnInit() {
    this.isLoginSuccess =false;
    // reset login status
    this.loginService.logout();
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Search';

  }
  onLogin() {
    if (AppSettings.IS_DEV) {
      console.log('USER_NAME[' + this.model.username + ']', 'PASSWORD[' + this.model.password + ']');
    }
    this.loading = true;
    this.loginService.login(this.model.username, this.model.password)
      .subscribe(
      data => {
      
        if(data && data.error){
          this.alertService.error(data.error);
          this.loading = false;
        }else{
        
        if (AppSettings.IS_DEV) {
          console.log(this.returnUrl);
        }
        //this.router.navigate(['/']);
        this.isLoginSuccess =true;
      }
      },
      error => {
        if (AppSettings.IS_DEV) {
          console.log(error);
        }
        this.alertService.error('Error: Username or password is incorrect');
        this.loading = false;
      });
  }


}
