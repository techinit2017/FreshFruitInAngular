import { IUser } from "app/user/user";

export class Approval {
    id : number;
	userProfile =  new IUser();
	approvedBy : number;
	approvedDate: Date;

}