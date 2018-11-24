'use strict';
const jwt = require('jsonwebtoken');
const validTime = '24h';

class Login {
  create(user, password) {
    return new Promise((resolve, reject) => {
      console.log('styo ac');
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
}

module.exports = Login;
