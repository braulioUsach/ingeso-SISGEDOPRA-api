'use strict';
const jwt = require('jsonwebtoken');
const validTime = '24h';

const User = require('../user/index');

class Login {
  create(email, password) {
    return new Promise((resolve, reject) => {
      if (!this.__hasParameters(email, password)) {
        return reject(new Error('Missing paramater'))
      }

      let user = new User();

      return user.read(email, password)
        .then(user => {
          const token = this.__generateToken(email);

          resolve({
            type: "Bearer",
            token: token,
            expiresIn: validTime
          });
        })
        .catch(err => {
          console.error(err);
          reject(err);
        })
    })
  };

  __generateToken(email) {
    const tokenData = {
      email: email,
      accountType: 'user'
    }
    return jwt.sign(tokenData, 'imsomnia_2018', {
      expiresIn: validTime
    });
  }

  __hasParameters(email, password) {
    if (email === undefined) {
      return false;
    }

    if (password === undefined) {
      return false;
    }

    return true;
  }
}

module.exports = Login;