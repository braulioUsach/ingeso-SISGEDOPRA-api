'use strict';

const UserRepository = require('./user-repository');

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
  create(user, password) {
    return new Promise((resolve, reject) => {
      if (!this.__hasParameters(user, password)){
        return reject(new Error('Missing paramater'))
      }

      resolve ({
        user, password
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

module.exports = User;
