const Repository = require('./repository');
const Helper = require('./helper');

class User {
  static create(params) {
    return new Promise((resolve, reject) => {
      if (!Helper.hasCreateParams(params)) {
        return reject(new Error('Faltan parámetros'));
      }

      const arrayParams = Helper.createParams(params);
      return Repository.create(arrayParams)
        .then((row) => {
          resolve({
            id: row.insertId,
            firstName: params.firstName,
            email: params.email,
          });
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  static read(email) {
    return new Promise((resolve, reject) => {
      if (!Helper.hasReadParams(email)) {
        return reject(new Error('Faltan parámetros'));
      }

      return Repository.read(email)
        .then(row => resolve(row))
        .catch((err) => {
          console.error(err);
          return reject(err);
        });
    });
  }

  static readAll() {
    return new Promise((resolve, reject) => Repository.readAll()
      .then(rows => resolve(rows))
      .catch((err) => {
        console.error(err);
        return reject(err);
      }));
  }
}

module.exports = User;
