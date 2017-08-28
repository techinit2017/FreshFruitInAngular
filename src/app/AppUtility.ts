/**
 * Zip Code validator
 */
export class AppUtility {
  public static ZIP_CODE_PATTERN = '^[0-9]{6}(?:-[0-9]{4})?$';
  public static EMAIL_REGEX = '/^[a-zA-Z0-9.!#$%&�*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;';
  public static zipValidator(zip) {
    const valid = /^\d{5}$/.test(zip.value);
    if (valid) {
      return null;
    }
    return {'Invalid Zip Code': true};
  }

  public static removeEmptyorNullKeys(obj) {
    if (obj == null) {
      return ;
    }
   return Object.keys(obj).forEach((key) => (obj[key] == null) && delete obj[key]);
  }
  
}
