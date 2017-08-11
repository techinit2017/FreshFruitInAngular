export class IProductAdd {
  id: number;
  // User information
  productName: string;
  productType: string;
  productInfo: string;
  productDesc: string;
  grade: string;
  size: number;

  // contact information
  color: string;
  minOrderQty: string;
  quantityAvailable: string;
  price: number;
  priceNegotiable: number;
  measurement: number;
  packaging: string;
  isActive: string;
  avilable: Date;

  // additional information
  primaryActivity: string;
  productionCountryArray: string[];
  operationalYear: string;
  productProducedArray: string[];
  sellingMarketsArray: string[];
  annualTotalProduction: number;
  // attributes representing array Object = > Comma Seperated String
   productionCountry: string;
   sellingMarkets: string;
   productProduced: string;
  
  securityQuestion: string;
  securityans: string;
  dob: Date;
}

export enum PrimaryActivitySeller {
  Food_Production,
  Food_Sales,
  Food_Brokerage
}

export enum PrimaryActivityBuyer {
  retail_seller,
  food_wholesale
}


export enum SecurityQuestion {
  QUESTION_1,
  QUESTION_2,
  QUESTION_3,
  QUESTION_4
}
