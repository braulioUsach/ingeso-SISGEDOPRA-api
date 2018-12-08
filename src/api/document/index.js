'use strict';

const Repository = require('./repository');

class User {
  static ping() {
    let userRepository = new Repository();
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
  static create(params) {
    return new Promise((resolve, reject) => {
      return Repository.create({name: 'documento de prueba'})
        .then(row => {
          resolve({
            id: row.insertId,
            name: params.name
          });
        })
        .catch(err => {
          console.error(err);
          reject(err);
        })
    })
  };

}

module.exports = User;
