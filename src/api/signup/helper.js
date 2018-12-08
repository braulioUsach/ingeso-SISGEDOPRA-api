const _ = require('lodash');

class SignUpHelper {
  static hasCreateParams(params) {
    return params !== undefined;
  }

  static formatValidationInputsError(errors) {
    const resp = {};
    _.chain(errors).groupBy('param').map((v, i) => { resp[i] = _.map(v, 'msg'); }).value();
    return resp;
  }
}

module.exports = SignUpHelper;
