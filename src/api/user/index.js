'use strict';

const UserRepository = require('./user-repository');
const crypto = require('crypto');

class User {
  ping() {
    let userRepository = new UserRepository();
    return new Promise((resolve, reject) => {
      userRepository.ping()
        .then((resp) => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        })
    })
  }
  create(params) {
    let userRepository = new UserRepository();
    return new Promise((resolve, reject) => {
      if (!this.__hasCreateParams(params)) {
        return reject(new Error('Missing paramaters'))
      }

      const arrayParams = this.__createParams(params);
      return userRepository.create(arrayParams)
        .then(row => {
          console.log('row', row);
          resolve({
            id: row.insertId,
            firstName: params.firstName,
            email: params.email
          });
        })
        .catch(err => {
          console.error(err);
          reject(err);
        })
    })
  };

  __createParams(params) {
    return [
      params.firstName,
      params.lastName,
      this.__extractDNI(params.rut),
      this.__extractDNIValidator(params.rut),
      params.email,
      this.__passwordEncrypt(params.password)
    ];
  }

  __extractDNI(dni) {
    let clean;
    clean = dni.split('.').join('');
    clean = clean.split('-').join('');

    return clean.substr(0, clean.length - 1);
  }

  __extractDNIValidator(dni) {
    let clean;
    clean = dni.split('.').join('');
    clean = clean.split('-').join('');
    return clean.substr(-1);
  }

  __passwordEncrypt(password) {
    return crypto.createHash('md5').update(password).digest("hex");
  }

  __hasCreateParams(params) {
    return params === undefined ? false : true;
  }
}

module.exports = User;