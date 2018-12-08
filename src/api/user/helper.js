const _ = require('lodash');
const crypto = require('crypto');

class UserHelper {
  static createParams(params) {
    return [
      params.firstName,
      params.lastName,
      this.constructor.extractDNI(params.rut),
      this.constructor.extractDNIValidator(params.rut),
      params.email,
      this.constructor.passwordEncrypt(params.password),
    ];
  }

  static formatValidationInputsError(errors) {
    const resp = {};
    _.chain(errors).groupBy('param').map((v, i) => { resp[i] = _.map(v, 'msg'); }).value();
    return resp;
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
