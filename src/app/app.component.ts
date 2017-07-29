import {LoginService} from './login/login.service';
import {IUser} from './user/user';
import {UserService} from './user/user.service';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentUser: IUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log('currentuser start - >');
    console.log(this.currentUser);
    // console.log('currentuser end - >');

  }

  redirect = function() {
    this.router.navigate(['/Login']);
  }


  redirectNewUser = function() {
    this.router.navigate(['/User']);
  }

  doLogout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    if (!localStorage.getItem('currentUser')) {
      console.log('logout successfully done!!');
       this.currentUser = null;
    }
  }
}
