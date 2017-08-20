import { IUser } from '../user/user';
import { Component, OnInit } from '@angular/core';
import { SellerproductService } from "app/sellerproduct/sellerproduct.service";
import { IProduct } from "app/product/product";
import { AlertService } from "app/_services/alert.service";
import { AppSettings } from "app/AppSettings";

@Component({
  selector: 'app-sellerproduct',
  templateUrl: './sellerproduct.component.html',
  styleUrls: ['./sellerproduct.component.css'],
  providers: [SellerproductService, AlertService],
})
export class SellerproductComponent implements OnInit {
 currentUser: IUser;
 products: IProduct[];
  constructor(private sellerservice: SellerproductService,private alertService: AlertService) {

   }

  ngOnInit() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.getSellerProduct();
  }
  
   getSellerProduct(): void {
    if (this.currentUser) {
      this.sellerservice.getSellerProduct(this.currentUser).subscribe(data =>{
      this.products = data;
        if( this.products.length<=0){
          this.alertService.success('No Record found');
      }
      }, error=> {
        this.alertService.error('Error: Service unavailable');
      }, () => this.onRequestComplete());
    }
    
  }

  onRequestComplete() {
    if (AppSettings.IS_DEV){
      console.log('Finished');
    }
  }
}
