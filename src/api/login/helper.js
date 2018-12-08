const _ = require('lodash');
const jwt = require('jsonwebtoken');
const UserHelper = require('../user/helper');

const validTime = '24h';
const secret = 'imsomnia_2018';

class LoginHelper {
  static formatValidationInputsError(errors) {
    const resp = {};
    _.chain(errors).groupBy('param').map((v, i) => { resp[i] = _.map(v, 'msg'); }).value();
    return resp;
  }

  static createToken(data) {
    const tokenData = {
      email: data.email,
      userId: data.id,
      accountType: 'user',
    };
    return jwt.sign(tokenData, secret, {
      expiresIn: validTime,
    });
  }

  static readToken(token) {
    return jwt.verify(token, secret);
  }

  static hasParameters(email, password) {
    if (email === undefined) {
      return false;
    }

    if (password === undefined) {
      return false;
    }

    return true;
  }

  static passwordEncrypt(password) {
    return UserHelper.passwordEncrypt(password);
  }
}

module.exports = LoginHelper;
