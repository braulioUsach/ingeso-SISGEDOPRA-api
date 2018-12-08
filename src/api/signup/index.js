const User = require('../user/index');
const Login = require('../login/index');
const Helper = require('./helper');

class SignUp {
  static create(params) {
    const user = new User();
    const login = new Login();
    return new Promise((resolve, reject) => {
      if (!Helper.hasCreateParams(params)) {
        return reject(new Error('Faltan parámetros'));
      }

      return user.create(params)
        .then(() => login.create(params.email, params.password))
        .then(token => resolve(token))
        .catch((err) => {
          console.error(err);
          return reject(err);
        });
    });
  }
}

module.exports = SignUp;
