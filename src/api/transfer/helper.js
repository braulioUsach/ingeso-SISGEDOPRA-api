const AppHelper = require('../../app/helper');

class DocumentHelper {
  static paramsToCreate(params, tokenValues) {
    return [
      params.document, tokenValues.userId, params.to,
    ];
  }

  static formatValidationInputsError(errors) {
    return AppHelper.formatValidationInputsError(errors);
  }

  static hasValidCredential(token) {
    return AppHelper.hasValidCredential(token);
  }
}

module.exports = DocumentHelper;
