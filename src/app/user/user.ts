export class IUser {
  id: number;
  // User information
  companyName: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  userType: string;

  // contact information
  country: string;
  city: string;
  address: string;
  phoneNumber: string;
  emailId: string;
  secondaryContact: string;

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
