const crypto = require('crypto');
const AppHelper = require('../../app/helper');

class UserHelper {
  static createParams(params) {
    return [
      params.firstName,
      params.lastName,
      UserHelper.extractDNI(params.rut),
      UserHelper.extractDNIValidator(params.rut),
      params.email,
      UserHelper.passwordEncrypt(params.password),
    ];
  }

  static formatValidationInputsError(errors) {
    return AppHelper.formatValidationInputsError(errors);
  }

  static extractDNI(dni) {
    let clean;
    clean = dni.split('.').join('');
    clean = clean.split('-').join('');

    return clean.substr(0, clean.length - 1);
  }

  static extractDNIValidator(dni) {
    let clean;
    clean = dni.split('.').join('');
    clean = clean.split('-').join('');
    return clean.substr(-1);
  }

  static passwordEncrypt(password) {
    return crypto.createHash('md5').update(password).digest('hex');
  }

  static hasCreateParams(params) {
    return params !== undefined;
  }

  static hasReadParams(params) {
    return params !== undefined;
  }
}

module.exports = UserHelper;
