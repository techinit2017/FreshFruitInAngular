import {IProduct} from './product';
import {ProductService} from './product.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService],
})
export class ProductComponent implements OnInit {

  prodlist = 'Product';
  iProduct: IProduct[];
  errorMsg:  string;
  postData: string;
  filteredItems: IProduct[];
  pages = 4;
  pageSize = 5;
  pageNumber = 0;
  currentIndex = 1;
  items: IProduct[];
  pagesIndex: Array<number>;
  pageStart = 1;
  inputName: '';
  constructor(private _productService: ProductService) {
       
  }
  
   ngOnInit() {
    this._productService.getProducts()
    .subscribe(iProduct => this.iProduct = iProduct, err => this.errorMsg = <any>err);
  }
  
  /*init() {
         this.currentIndex = 1;
         this.pageStart = 1;
         this.pages = 4;

         this.pageNumber = parseInt('' + (this.filteredItems.length / this.pageSize));
         if (this.filteredItems.length % this.pageSize != 0) {
            this.pageNumber ++;
         }
    
         if (this.pageNumber  < this.pages) {
               this.pages =  this.pageNumber;
         }
       
         this.refreshItems();
         console.log('this.pageNumber:' + this.pageNumber);
   }
  

 


  fillArray(): any {
    var obj = new Array();
    for (var index = this.pageStart; index < this.pageStart + this.pages; index++) {
      obj.push(index);
    }
    return obj;
  }
  refreshItems() {
    this.items = this.filteredItems.slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);
    this.pagesIndex = this.fillArray();
  }
  prevPage() {
    if (this.currentIndex > 1) {
      this.currentIndex--;
    }
    if (this.currentIndex < this.pageStart) {
      this.pageStart = this.currentIndex;
    }
    this.refreshItems();
  }
  nextPage() {
    if (this.currentIndex < this.pageNumber) {
      this.currentIndex++;
    }
    if (this.currentIndex >= (this.pageStart + this.pages)) {
      this.pageStart = this.currentIndex - this.pages + 1;
    }

    this.refreshItems();
  }
  setPage(index: number) {
    this.currentIndex = index;
    this.refreshItems();
  }

  */
  
  
}
