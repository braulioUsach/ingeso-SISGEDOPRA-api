'use strict';
const jwt = require('jsonwebtoken');
const validTime = '24h';

class Login {
  create(user, password) {
    return new Promise((resolve, reject) => {
      if (!this.__hasParameters(user, password)){
        return reject(new Error('Missing paramater'))
      }
      const tokenData = {
        user: user,
        accountType: 'admin'
      }

      const token = jwt.sign(tokenData, 'imsomnia_2018', {
         expiresIn: validTime
      });

      resolve ({
        type: "Bearer",
        token: token,
        expiresIn: validTime
      });
    })
  };

  __hasParameters(user, password) {
    if (user === undefined) {
      return false;
    }

    if (password === undefined) {
      return false;
    }

    return true;
  }
}

module.exports = Login;
