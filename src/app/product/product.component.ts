import {IProduct} from './product';
import {ProductService} from './product.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  prodlist = 'Product';
  iProduct: IProduct[];
  errorMsg: string;
  constructor(private _productService: ProductService) {}

  ngOnInit() {
    this._productService.getProducts()
      .subscribe(iProduct => this.iProduct = iProduct, err => this.errorMsg = <any>err);
  }
}
