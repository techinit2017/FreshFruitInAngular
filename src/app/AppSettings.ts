export class AppSettings {
  public static IS_DEV = false;
  public static IP_ADDRESS = 'http://localhost:8082/';
  constructor() {
    if (AppSettings.IS_DEV) {
      AppSettings.IP_ADDRESS = 'http://localhost:8082/';
    } else {
      AppSettings.IP_ADDRESS = 'http://13.90.152.165:8080/FFP_APP_REST/';
    }
  }


  public static CONST_SECRET = 'SECRET';
  public static CONST_FRUIT = 'FRUIT';
  // user End point
  // public static GET_USERS = 'assets/users.json';
  public static GET_USERS = AppSettings.IP_ADDRESS + 'profile/getAllUsersProfile';

  public static GET_PAGINATED_USERS = AppSettings.IP_ADDRESS + 'profile/getAllUsersProfileByPageRequest';

  public static POST_USER_SAVE = AppSettings.IP_ADDRESS + 'profile/create';
  public static PUT_USER_SAVE = AppSettings.IP_ADDRESS + 'profile/save';
  public static POST_SECRET_IDENTITY_VALIDATE = AppSettings.IP_ADDRESS + 'profile/validate';
  public static POST_USER_APPROVAL = AppSettings.IP_ADDRESS + 'approval/approve';

  public static USER_AUTH_SERVICE = AppSettings.IP_ADDRESS + 'profile/login';
  // End Point GET_USER
  public static GET_USER_BY_IDENTITY = AppSettings.IP_ADDRESS + 'profile/getUserProfileByUniqueIdentity/';

  public static POST_FORGET_PASSWORD_VALIDATE = AppSettings.IP_ADDRESS + 'profile/validate';
  public static POST_PASSWORD_RESET = AppSettings.IP_ADDRESS + 'profile/resetPassword';

  // product End point
  public static GET_PRODUCTS = AppSettings.IP_ADDRESS + 'product/getAllProducts';
  public static GET_PRODUCT_BY_ID = AppSettings.IP_ADDRESS + 'product/getProductByID';
  public static POST_PRODUCT = AppSettings.IP_ADDRESS + 'product/create';
  public static PUT_PRODUCT = AppSettings.IP_ADDRESS + 'product/save';
  // product Search End point
  public static SEARCH_PRODUCTS = AppSettings.IP_ADDRESS + 'product/getSearchProducts';

  public static GET_PRODUCTS_VARIETY = AppSettings.IP_ADDRESS + 'productVariety/getProductVarietyByProduct/';
  public static GET_PRODUCT_NAMES = AppSettings.IP_ADDRESS + 'productVariety/getProductNames';

  public static GET_LOV_BY_TYPE = AppSettings.IP_ADDRESS + 'productVariety/getProductByType';

  public static GET_COUNTRY_INFO = AppSettings.IP_ADDRESS + 'country/getAllCountry';


  // product Demand End Points
  public static POST_USER_DEMAND = AppSettings.IP_ADDRESS + 'demand/getDemandByBuyerID';

  public static GET_ALL_DEMANDS = AppSettings.IP_ADDRESS + 'demand/getAllDemands';

  public static POST_DEMAND_SAVE = AppSettings.IP_ADDRESS + 'demand/create';

  public static PUT_DEMAND_SAVE = AppSettings.IP_ADDRESS + 'demand/update';


    // Get Seller Product
  public static GET_SELLER_PRODUCTS = AppSettings.IP_ADDRESS + 'product/getProductBySellerId';

  public static GET_ROLE = '';

}

