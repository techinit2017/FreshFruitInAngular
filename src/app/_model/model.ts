
export class PageParam{   
    sort: Sort[];
    constructor(public pageNumber: number, public pageSize: number){
    }
}
export class Sort {
  direction: string;
  property: string[] = [];
}

export class Role{
    menuNames: string[];
    rolesRequired:string;
}

export class DialogModel{
    public headerText: string = '';
    public boxLabel: string ='';
    public confirmButtonLabel: string;
    public cancelButtonLabel: string;
}


/*

{
    "sort": [
        {
            "direction": "ASC",
            "property": "firstName"
            
        },
        {
            "direction": "desc",
            "property": "lastName"
            
        }
    ],
    "pageNumber": 0,
    "pageSize": 3
}* 
 */
