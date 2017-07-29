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
  constructor(private route: ActivatedRoute,
    private router: Router, private loginService: LoginService, private alertService: AlertService) {

  }

  ngOnInit() {
    // reset login status
    this.loginService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Search';

  }
  onLogin() {
    console.log('USER_NAME[' + this.model.username + ']', 'PASSWORD[' + this.model.password + ']');
    this.loading = true;
    this.loginService.login(this.model.username, this.model.password)
      .subscribe(
      data => {
        console.log(this.returnUrl);
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log(error);
        this.alertService.error('Error: Username or password is incorrect');
        this.loading = false;
      });
  }
  
  logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }


}
