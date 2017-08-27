import { IUser } from '../user/user';
import { Component, OnInit } from '@angular/core';
import { SellerproductService } from "app/sellerproduct/sellerproduct.service";
import { IProduct } from "app/product/product";
import { AlertService } from "app/_services/alert.service";
import { AppSettings } from "app/AppSettings";
import { ProductService } from "app/product/product.service";
import { DialogComponent } from "app/dialog/dialog.component";
import { MdDialog, MdDialogRef } from "@angular/material";

@Component({
  selector: 'app-sellerproduct',
  templateUrl: './sellerproduct.component.html',
  styleUrls: ['./sellerproduct.component.css'],
  providers: [SellerproductService, AlertService, ProductService],
})
export class SellerproductComponent implements OnInit {
  currentUser: IUser;
  products: IProduct[];
  constructor(private sellerservice: SellerproductService, private alertService: AlertService, private productService: ProductService, private dialog: MdDialog) {

  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getSellerProduct();
  }

  getSellerProduct(): void {
    if (this.currentUser) {
      this.sellerservice.getSellerProduct(this.currentUser).subscribe(data => {
        this.products = data;
        if (this.products.length <= 0) {
          this.alertService.success('No Record found');
        }
      }, error => {
        this.alertService.error('Error: Service unavailable');
      }, () => this.onRequestComplete());
    }

  }

  onRequestComplete() {
    if (AppSettings.IS_DEV) {
      console.log('Finished');
    }
  }

  changeProduct(product: IProduct, status: number) {
    let dialogRef = this.dialog.open(DialogComponent, {
      disableClose: false, data: {
        headerText: 'Status',
        boxLabel: status==0 ?'Do you want to In-Active Product?':'Do you want to Active Product?',
        confirmButtonLabel: 'Ok',
        cancelButtonLabel: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result == 'true') { 
        this.updateStatus(product, status);
      } else {
        dialogRef = null;
      }
    });


  }

  updateStatus(product: IProduct, status: number) {
    if (product) {
      product.isActive = status;
      this.productService.save(product).subscribe(data => {
        this.getSellerProduct();
      },
        err => {
          this.alertService.error('Error: Product Creation');
        },
        () => this.onRequestComplete());;
    }
  }
}
