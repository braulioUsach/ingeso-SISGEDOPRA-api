const _ = require('lodash');

class DocumentHelper {
  static paramsToCreate(params, tokenValues) {
    console.log(tokenValues);
    return [
      params.name, tokenValues.userId, params.type,
    ];
  }

  static formatValidationInputsError(errors) {
    const resp = {};
    _.chain(errors).groupBy('param').map((v, i) => { resp[i] = _.map(v, 'msg'); }).value();
    return resp;
  }
}

module.exports = DocumentHelper;
