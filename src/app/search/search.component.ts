import {AppSettings} from '../AppSettings';
import {MasterdataService} from '../_services/masterdata.service';
import {IProduct} from '../product/product';
import {ISearch, Country, PriceDelimiter, Availbility, ProductVariety} from './search';
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
  providers: [SearchService, MasterdataService]
})
export class SearchComponent implements OnInit {
  // form UI component controller variable
  loading = false;

  // dataVariable
  country: Country[];
  variety: ProductVariety[];
  productlist: string[];

  priceDelimiter: string[] = Object.keys(PriceDelimiter);
  avail: string[] = Object.keys(Availbility);

  // country: Country.India;
  searchObj: ISearch;

  result: string;
  query: string;
  iProduct: IProduct[];
  errorMsg: string;
  postData: string;

  searchPriceQuery: string;

  constructor(public searchService: SearchService, public router: Router, public masterDataService: MasterdataService) {
    this.query = '';
    this.searchObj = new ISearch();
    this.priceDelimiter = this.priceDelimiter.slice(this.priceDelimiter.length / 2);
    this.avail = this.avail.slice(this.avail.length / 2);

  }

  ngOnInit(): void {
    this.search();
    this.getCountries();
    this.getProductByVariety(null);
    this.getProducts();
  }

  isLoading(): boolean {
    return !this.loading;
  }


  submit(query: string): void {
    this.loading = this.isLoading();
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

  getCountries(): void {
    this.masterDataService
      .getCountries()
      .subscribe(country => this.country = country,
      err => this.errorMsg = <any>err);
  }

  getProductByVariety(productName: string): void {
    if (!productName) {
      productName = 'APPLE';
    }
    this.masterDataService
      .getProductByVariety(productName)
      .subscribe(variety => this.variety = variety,
      err => this.errorMsg = <any>err);
  }

  getProducts(): void {
    this.masterDataService
      .getProductNames()
      .subscribe(name => this.productlist = name,
      err => this.errorMsg = <any>err);
  }

  filterSearch(searchObj: ISearch) {
    if (AppSettings.IS_DEV) { 
      console.log(searchObj);
    }
    this.searchService.doSearch(searchObj)
      .subscribe(iProduct => this.iProduct = iProduct,
      err => this.errorMsg = <any>err);
  }

}

