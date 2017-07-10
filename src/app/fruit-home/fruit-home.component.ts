import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Http, Response, HttpModule, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-fruit-home',
  templateUrl: './fruit-home.component.html',
  styleUrls: ['./fruit-home.component.css']
})
export class FruitHomeComponent implements OnInit {
userID;
passcode;
  constructor(public http: Http, private router: Router) { }

  ngOnInit() {
  }

  ValidateLogin() {
     this.router.navigateByUrl('buyer');
     localStorage.setItem('tabvalue', 'active');
      localStorage.setItem('tabvalue2', 'inactive');
      localStorage.setItem('fadevalue', 'fade in active row');
      localStorage.setItem('fadevalue2', 'fade');
//       var data = {
//       userID: this.userID,
//       passcode: this.passcode
//     }
//     let headers = new Headers({'Content-Type': 'text/plain'});
//     let options = new RequestOptions({headers: headers});
//     let body = JSON.stringify(data);
//     this.http.post('https://unileverbps.mybluemix.net/bps/TransactionManager?method=login', body, headers).subscribe(res => {
//       console.log(res.json());
//       var username = res.json().UserID;
//       console.log(username);

//        if ((this.userID === username)) {
//         localStorage.setItem('role',res.json().RoleName);
//         localStorage.setItem('roleid',res.json().RoleID);
//         localStorage.setItem('companyname',res.json().CompanyName);
//         localStorage.setItem('UserID',res.json().UserID);
//       localStorage.setItem('tabvalue',"active");
//       localStorage.setItem('tabvalue2',"inactive");
//       localStorage.setItem('fadevalue',"fade in active row");
//       localStorage.setItem('fadevalue2',"fade");
//           this.router.navigateByUrl('invoice');
//        }else{
//          alert("Invalid Username or Password");
//        }
// });
  }
}
