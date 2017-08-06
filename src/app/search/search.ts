/**
 * Search Component Object
 */
export class ISearch {
  seller: string;
  price: number;
  pricedlimit: string;
  variety: string[];
  product: string;
  quantity: number;
  avail: string;
  country: string;
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

