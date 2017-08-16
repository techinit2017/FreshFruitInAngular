export class IUser {
  id: number;
  // User information
  companyName: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  confirmPassword: string;
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
  countryOfOperationArray: string[];
  operationSince: string;
  typeFruit: string;
  typeFruitVarietyArray: string[];
  currentOpCountryArray: string[];
  annualOpQuantity: number;
  // attributes representing array Object = > Comma Seperated String
  typeFruitVariety: string;
  countryOfOperation: string;
  currentOpCountry: string;
  secretQuestion: string;
  secretAnswer: string;
  dob: Date;
  approved: string;
  weightIn: string;



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
