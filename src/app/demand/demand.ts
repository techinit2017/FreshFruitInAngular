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
  country: string;
  city: string;
}


