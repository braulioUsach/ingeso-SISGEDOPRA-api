const AppHelper = require('../../app/helper');

class DocumentHelper {
  static paramsToCreate(params, tokenValues) {
    console.log(tokenValues);
    return [
      params.name, tokenValues.userId, params.type,
    ];
  }

  static formatValidationInputsError(errors) {
    return AppHelper.formatValidationInputsError(errors);
  }

  static hasValidCredential(token) {
    const resp = (token !== undefined && token !== null);
    console.log(resp);
    return resp;
  }
}

module.exports = DocumentHelper;
