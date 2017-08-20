/**
 * Search Component Object
 */
import { IUser } from '../user/user';
export class IDemand {
  id: number;
  userProfile: IUser;
  product: string;
  variety: string;
  grade: string;
  size: string;
  color: string;
  quantity: string;
  price: string;
  measurement: string;
  availableDate: Date;
  countryArray: string[];
  varietyArray: string[];
  country: string;
  city: string;
}

export class Grade {
  id: number;
  grade: string;
  gradeCode: string;
}

export enum ProductSize {
  Small,
  Medium,
  Large
}

export enum ProductColor {
  Red,
  Green,
  Yellow
}

export enum MeasurementType {
  KG,
  Outer,
  Ton
}

export enum ProductGrade {
  A,
  B,
  C,
  D
}


