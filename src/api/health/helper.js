const _ = require('lodash');

class DocumHelper {
  static paramsToCreate(params) {
    return [
      params.name, 35, params.type,
    ];
  }

  static formatValidationInputsError(errors) {
    const resp = {};
    _.chain(errors).groupBy('param').map((v, i) => { resp[i] = _.map(v, 'msg'); }).value();
    return resp;
  }
}

module.exports = DocumentHelper;
