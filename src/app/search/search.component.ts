import { AppSettings } from '../AppSettings';
import { AlertService } from '../_services/alert.service';
import { MasterdataService } from '../_services/masterdata.service';
import { IProduct } from '../product/product';
import { ISearch, Country, PriceDelimiter, Availbility, ProductVariety } from './search';
import { SearchService } from './search.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Router,
  RouterLink,
  ActivatedRoute,
} from '@angular/router';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService, MasterdataService, AlertService],
})
export class SearchComponent implements OnInit, OnDestroy {

  // form UI component controller variable
  loading = false;
  count;
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

  constructor(private searchService: SearchService, private router: Router, private masterDataService: MasterdataService
    , private alertService: AlertService, private route: ActivatedRoute) {
    this.query = '';
    this.searchObj = new ISearch();
    this.priceDelimiter = this.priceDelimiter.slice(this.priceDelimiter.length / 2);
    this.avail = this.avail.slice(this.avail.length / 2);

  }

  ngOnInit(): void {
    const name: Observable<string> = this.route.params.map(p => p.name);
    let searchQuery: string;
    name.subscribe(e => searchQuery = e);
    if (searchQuery) {
      let searchObj = new ISearch();
      searchObj.type = searchQuery;
      this.filterSearch(searchObj);
    }

    this.search();
    this.getCountries();
    this.getProductByVariety(null);
    this.getProducts(AppSettings.CONST_FRUIT);
  }

  isLoading(): boolean {
    return !this.loading;
  }


  submit(query: string): void {
    this.loading = this.isLoading();
    this.router.navigate(['/Search', { query: query }]);
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
      .subscribe(iProduct => this.iProduct = iProduct.filter(x => this.query.toUpperCase().startsWith(x.name.toUpperCase())),
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

  getProducts(productType: string): void {
    this.masterDataService
      .getProductNames(productType)
      .subscribe(name => this.productlist = name,
      err => this.errorMsg = <any>err);
  }

  filterSearch(searchObj: ISearch) {

    // this.iProduct = null;
    // console.log(searchObj);
    if (AppSettings.IS_DEV) {
      console.log(searchObj);
    }
    this.searchService.getSearchProduct(searchObj).then(result => {
      //  console.log(result);
      this.iProduct = result.products;
      this.count = result.count;
      //  console.log(this.iProduct);
      if (this.count == 0) {
        console.log('No search result found.. Please try with different filter');
        this.alertService.success('No search result found.. Please try with different filter');
      }
      this.loading = false;
    }, error => {
      if (AppSettings.IS_DEV) {
        console.log(error);
      }
      this.alertService.error('Error: Service unavailable');
      this.loading = false;
    });

    //    this.searchService.getSearchProduct(searchObj)
    //      .subscribe(iProduct => this.iProduct = iProduct,
    //      err => this.errorMsg = <any>err);
  }
  onChange(value) {
    console.log(value);
    if (value) {
      this.getProductByVariety(value);
    }
  }
  ngOnDestroy(): void {
    this.iProduct = null;
    this.count = null;
  }
}

