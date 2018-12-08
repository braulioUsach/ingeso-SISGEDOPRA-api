const jwt = require('jsonwebtoken');
const AppHelper = require('../../app/helper');
const UserHelper = require('../user/helper');

const validTime = '24h';
const secret = 'imsomnia_2018';

class LoginHelper {
  static formatValidationInputsError(errors) {
    return AppHelper.formatValidationInputsError(errors);
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
