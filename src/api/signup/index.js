'use strict';

const User = require('../user/index');
const Login = require('../login/index');
const crypto = require('crypto');

class SignUp {
  create(params) {
    let user = new User();
    let login = new Login();
    return new Promise((resolve, reject) => {
      if (!this.__hasCreateParams(params)) {
        return reject(new Error('Faltan parámetros'))
      }

      return user.create(params)
        .then(user => {
          return login.create(params.email, params.password);
        })
        .then(token => {
          return resolve(token);
        })
        .catch(err => {
          console.error(err);
          return reject(err);
        })
    })
  };

  __hasCreateParams(params) {
    return params === undefined ? false : true;
  }
}

module.exports = SignUp;