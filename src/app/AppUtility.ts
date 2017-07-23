/**
 * Zip Code validator
 */
export class AppUtility {
  public static ZIP_CODE_PATTERN = '^[0-9]{6}(?:-[0-9]{4})?$';
  public static EMAIL_VALIDATOR = '[^ @]*@[^ @]*';
  public static zipValidator(zip) {
    const valid = /^\d{5}$/.test(zip.value);
    if (valid) {
      return null;
    }
    return {'Invalid Zip Code': true};
  }
}
