/**
 * Search Component Object
 */
export class ISearch {
  // Type of Product
  type: string;
  // Variety of Product
   name: string;
  priceBelow: string;
  priceAbove: string;
  // country
  country: string;
  // page number
  pageNumber: number;
  // page size
  pageSize: number;
  // available after 
  availableAfter: Date;
  // available before
  availableBefore: Date;
  // measurement
  measurement: string;
  // quantity available
  quantityAvailable: string;  
  // Available (Yes/No)
  available: string;
  
  // transient object
  price: number;
  pricedlimit: string;
}

export class ProductVariety {
  id: number;
  product: string;
  variety: string;
}

export class Country {
  id: number;
  country: string;
  currencyName: string;
  code: string;
}


export enum PriceDelimiter {
  '>=',
  '<=',
}

export enum Availbility {
  YES,
  NO
}

