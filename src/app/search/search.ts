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

export enum AppleType {
  Ambrosia = 1,
  BraeBurn = 2,
  CAMEO = 3
}

export enum Country {
  Spain,
  India,
  UK,
  US
}

export enum PriceDelimiter {
  '>=',
  '<=',
}

export enum Availbility {
  YES,
  NO
}

