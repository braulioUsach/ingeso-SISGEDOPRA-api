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
}

module.exports = DocumentHelper;
