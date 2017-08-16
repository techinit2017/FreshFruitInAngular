export class Sort {
  direction: string;
  property: string[] = [];
  pageNumber: number;
  pageSize: number;
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
