const AppHelper = require('../../app/helper');

class DocumentHelper {
  static paramsToCreate(params) {
    return [
      params.name, 35, params.type,
    ];
  }

  static formatValidationInputsError(errors) {
    return AppHelper.formatValidationInputsError(errors);
  }
}

module.exports = DocumentHelper;
