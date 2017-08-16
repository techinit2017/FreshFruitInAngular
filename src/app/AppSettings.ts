export class AppSettings {
  public static IS_DEV = false;
  public static IP_ADDRESS = 'http://localhost:8082/';
  constructor() {
    if (AppSettings.IS_DEV) {
      AppSettings.IP_ADDRESS = 'http://localhost:8082/';
    } else {
      AppSettings.IP_ADDRESS = 'http://52.168.1.121:8080/FFP_APP_REST/';
    }
  }


  public static CONST_SECRET = 'SECRET';
  // user End point
  // public static GET_USERS = 'assets/users.json';
  public static GET_USERS = AppSettings.IP_ADDRESS + 'profile/getAllUsersProfile';

  public static GET_PAGINATED_USERS = AppSettings.IP_ADDRESS + 'profile/getAllUsersProfileByPageRequest';

  public static POST_USER_SAVE = AppSettings.IP_ADDRESS + 'profile/create';
  public static PUT_USER_SAVE = AppSettings.IP_ADDRESS + 'profile/save';
  public static POST_SECRET_IDENTITY_VALIDATE = AppSettings.IP_ADDRESS + 'profile/validate';

  public static USER_AUTH_SERVICE = AppSettings.IP_ADDRESS + 'profile/login';
  // End Point GET_USER
  public static GET_USER_BY_IDENTITY = AppSettings.IP_ADDRESS + 'profile/getUserProfileByUniqueIdentity/';

  // product End point
  public static GET_PRODUCTS = 'product/getAllProducts';

  // product Search End point
  public static SEARCH_PRODUCTS = AppSettings.IP_ADDRESS + 'product/getSearchProducts';

  public static GET_PRODUCTS_VARIETY = AppSettings.IP_ADDRESS + 'productVariety/getProductVarietyByProduct/';
  public static GET_PRODUCT_NAMES = AppSettings.IP_ADDRESS + 'productVariety/getProductNames';

  public static GET_COUNTRY_INFO = AppSettings.IP_ADDRESS + 'country/getAllCountry';


  // product Demand End Points
  public static GET_USER_DEMAND = AppSettings.IP_ADDRESS + 'demand/getDemandByID';

}

