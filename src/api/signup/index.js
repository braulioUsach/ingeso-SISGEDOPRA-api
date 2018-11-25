'use strict';

const User = require('../user/index');
const crypto = require('crypto');

class SignUp {
  create(params) {
    let user = new User();
    return new Promise((resolve, reject) => {
      if (!this.__hasCreateParams(params)) {
        return reject(new Error('Missing paramaters'))
      }

      return user.create(params)
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          console.error(err);
          reject(err);
        })
    })
  };

  __hasCreateParams(params) {
    return params === undefined ? false : true;
  }
}

module.exports = SignUp;