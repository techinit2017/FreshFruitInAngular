import {LoginService} from './login/login.service';
import {IUser} from './user/user';
import {UserService} from './user/user.service';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { menuItems } from "app/_model/menuItems";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentUser: IUser;
  menuItem;


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getMenu();
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
      this.router.navigate(['Home']);
    }

    
  }

  getMenu(){
    this.menuItem = menuItems.filter(
        element => {
          if(this.currentUser != null){
          return this.currentUser.userType.match(element.rolesRequired) ;
        } else {
          return 'Guest'.match(element.rolesRequired) ;
        }
       }
       
);
}
isAuth(key: string){
  let ispermit: boolean;
   this.menuItem.filter(
    element => {
      element.menuNames.filter(
        e=> {
          if(e.match(key)){
            ispermit = true;
          }
        }
      );
    }
   ); 
   return ispermit;
}
}
