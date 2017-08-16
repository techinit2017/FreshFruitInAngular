/**
 * Search Component Object
 */
export class IDemand {
  productName: string;
  variety: string[];
  quantity: number;
  desiredPrice: number;
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


