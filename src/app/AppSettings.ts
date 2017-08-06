export class AppSettings {
  public static IS_DEV = false;
  // user End point
  public static GET_USERS = 'assets/users.json';
  public static POST_USER_SAVE = 'http://localhost:8082/profile/create';

  public static USER_AUTH_SERVICE = 'http://localhost:8082/profile/login';
  // End Point GET_USER
  public static USER_GET_BY_USER_NAME = 'http://localhost:8082/profile/getUserProfileByUserName/';
    
   // End Point GET_USER
  public static USER_GET_BY_EMAIL = 'http://localhost:8082/profile/getUserProfileByEmailID/';  
  // product End point
  public static GET_PRODUCTS = 'assets/product.json';

  // product Search End point
  public static SEARCH_PRODUCTS = 'assets/search.json';

  public static GET_PRODUCTS_VARIETY = 'http://localhost:8082/productVariety/getProductVarietyByProduct/';
  public static GET_PRODUCT_NAMES = 'http://localhost:8082/productVariety/getProductNames';

  public static GET_COUNTRY_INFO = 'http://localhost:8082/country/getAllCountry';


}

