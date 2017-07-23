import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
     private route: ActivatedRoute,
     private router: Router
    ) {}

    redirect= function () {
        this.router.navigate(['/Login']);
    }
  
  
   redirectNewUser= function () {
        this.router.navigate(['/User']);
    }
}
