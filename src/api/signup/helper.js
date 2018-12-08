const AppHelper = require('../../app/helper');

class SignUpHelper {
  static hasCreateParams(params) {
    return params !== undefined;
  }

  static formatValidationInputsError(errors) {
    return AppHelper.formatValidationInputsError(errors);
  }
}

module.exports = SignUpHelper;
