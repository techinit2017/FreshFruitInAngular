import { IProduct } from '../product/product';
import {SearchService} from './search.service';
import {Component, OnInit} from '@angular/core';
import {
  Router,
  RouterLink,
} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {
  result: string;
  query: string;
  iProduct: IProduct[];
  errorMsg: string;
  postData: string;

  constructor(public searchService: SearchService, public router: Router) {
    this.query = '';
  }

  ngOnInit(): void {
    this.search();
  }

  submit(query: string): void {
   // console.log(query);
    this.router.navigate(['/Search', {query: query}]);
    this.query = query;
    this.result = 'Find [' +  this.query;
    this.search();
  }

  search(): void {
    console.error(this.query);
    if (!this.query) {
      return;
    }

    this.searchService
      .getProducts(this.query)
      .subscribe(iProduct => this.iProduct = iProduct.filter(x => this.query.toUpperCase().startsWith(x.ProductName.toUpperCase())),
        err => this.errorMsg = <any>err);
  }

  /*renderResults(res: any): void {
    this.results = null;
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items;
    }
  }*/
}

