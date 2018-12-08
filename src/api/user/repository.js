const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'sisgedopra.cjukhdrk5wtn.us-east-2.rds.amazonaws.com',
  user: 'insomnia',
  password: 'ingeso_2018',
  connectionLimit: 2,
  database: 'insomnia',
});

class UserRepository {
  static create(arrayParams) {
    let conn;
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((conection) => {
          conn = conection;
          return conn.query(
            'INSERT INTO users(firstname, lastname, dni, dniValidator, email, password) VALUES (?,?,?,?,?,?)',
            arrayParams,
          );
        })
        .then((rows) => {
          conn.end();
          resolve(rows);
        })
        .catch((err) => {
          if (conn) conn.end();
          console.error(err.message);
          if (err.code === 'ER_DUP_ENTRY') {
            reject(new Error('Ya existe una cuenta con ese email'));
          }
          reject(err);
        });
    });
  }

  static read(email) {
    let conn;
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((conection) => {
          conn = conection;
          return conn.query(
            `SELECT * FROM users WHERE email = "${email}"`,
          );
        })
        .then((rows) => {
          conn.end();
          const aux = JSON.parse(JSON.stringify(rows));
          if (aux.length !== 1) {
            return reject(new Error('Usuario no encontrado'));
          }
          return resolve(aux[0]);
        })
        .catch((err) => {
          if (conn) conn.end();
          console.error(err);
          return reject(err);
        });
    });
  }
}

module.exports = UserRepository;
