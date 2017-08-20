import {ISearch} from '../search/search';
import {IUser} from '../user/user';
export class IProduct {
//  ProductID: number;
//  ProductName: string;
//  url: string;
//  Quantity: number;
//  Variety: string;
//  Grade: string;
//  Country: string;
//  available: string;
//  packaging: string;
//  isActive: number;


  id: number;
  userProfile =  new IUser();
  name: string;
  type: string;
  imagePath: string;
  productInfo: string;
  productDesc: string;
  grade: string;
  size: string;
  color: string;
  minOrderQty: string;
  quantityAvailable: string;
  price: string;
  priceNegotiable: number;
  measurement: string;
  available: Date;
  packaging: string;
  isActive: number = 1;
  // New Fields
  countryArray: string[];
  country: string;
  city: string;
}
