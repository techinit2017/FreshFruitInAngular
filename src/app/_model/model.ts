
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
