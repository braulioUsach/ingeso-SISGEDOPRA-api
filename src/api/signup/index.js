const User = require('../user/index');
const Login = require('../login/index');
const Helper = require('./helper');

class SignUp {
  static create(params) {
    return new Promise((resolve, reject) => {
      if (!Helper.hasCreateParams(params)) {
        return reject(new Error('Faltan parámetros'));
      }

      return User.create(params)
        .then(() => Login.create(params.email, params.password))
        .then(token => resolve(token))
        .catch((err) => {
          console.error(err);
          return reject(err);
        });
    });
  }
}

module.exports = SignUp;
