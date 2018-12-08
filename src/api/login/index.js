const User = require('../user/index');
const Helper = require('./helper');

class Login {
  static create(email, password) {
    return new Promise((resolve, reject) => {
      if (!Helper.hasParameters(email, password)) {
        return reject(new Error('Faltan parámetros'));
      }

      return User.read(email)
        .then((data) => {
          console.log('data', data);
          const encryptedPassword = Helper.passwordEncrypt(password);
          if (data.password !== encryptedPassword) {
            return reject(new Error('No existe un usuario con esas credenciales'));
          }
          const token = Helper.createToken(data);
          return resolve({
            type: 'Bearer',
            token,
          });
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
}

module.exports = Login;
