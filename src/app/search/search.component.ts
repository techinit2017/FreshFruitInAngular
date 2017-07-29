import {IProduct} from '../product/product';
import {ISearch, Country, PriceDelimiter, Availbility, AppleType} from './search';
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
  // form UI component controller variable
  loading = false;

  // dataVariable
  country: string[] = Object.keys(Country);
  priceDelimiter: string[] = Object.keys(PriceDelimiter);
  avail: string[] = Object.keys(Availbility);
  variety: string[] = Object.keys(AppleType);
  // country: Country.India;
  searchObj: ISearch;

  result: string;
  query: string;
  iProduct: IProduct[];
  errorMsg: string;
  postData: string;

  searchPriceQuery: string;

  constructor(public searchService: SearchService, public router: Router) {
    this.query = '';
    this.searchObj = new ISearch();
    this.country = this.country.slice(this.country.length / 2);
    this.priceDelimiter = this.priceDelimiter.slice(this.priceDelimiter.length / 2);
    this.avail = this.avail.slice(this.avail.length / 2);
    this.variety = this.variety.slice(this.variety.length / 2);
    console.log(this.country);
  }

  ngOnInit(): void {
    this.search();
  }

  isLoading(): boolean {
    return !this.loading;
  }


  submit(query: string): void {
    this.loading = this.isLoading();
    // console.log(query);
    this.router.navigate(['/Search', {query: query}]);
    this.query = query;
    this.result = 'Find [' + this.query;
    this.search();
    this.loading = this.isLoading();
  }

  search(): void {
    if (!this.query) {
      return;
    }

    this.searchService
      .getProducts(this.query)
      .subscribe(iProduct => this.iProduct = iProduct.filter(x => this.query.toUpperCase().startsWith(x.ProductName.toUpperCase())),
      err => this.errorMsg = <any>err);
  }

  filterSearch(searchObj: ISearch) {
    console.log(searchObj);
    this.searchService.doSearch(searchObj)
      .subscribe(iProduct => this.iProduct = iProduct,
      err => this.errorMsg = <any>err);
  }

  /*renderResults(res: any): void {
    this.results = null;
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items;
    }
  }*/
}

