'use strict';

const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'sisgedopra.cjukhdrk5wtn.us-east-2.rds.amazonaws.com',
  user: 'insomnia',
  password: 'ingeso_2018',
  connectionLimit: 2,
  database: 'insomnia'
});

class UserRepository {
  ping() {
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then(conn => {
          console.log(`connected ! connection id is ${conn.threadId}`);
          conn.end();
          resolve({
            connected: true,
            threadId: conn.threadId
          });
        })
        .catch(err => {
          if (conn) conn.end();
          console.error(err);
          reject(new Error('Can`t connect to DB' + err));
        });
    })
  }

  create(arrayParams) {
    let conn;
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then(conection => {
          conn = conection;
          return conn.query(
            "INSERT INTO users(firstname, lastname, dni, dniValidator, email, password) VALUES (?,?,?,?,?,?)",
            arrayParams
          )
        })
        .then(rows => {
          conn.end();
          resolve(rows)
        })
        .catch(err => {
          if (conn) conn.end();
          console.error(err.message);
          if (err.code === 'ER_DUP_ENTRY') {
            reject(new Error('Ya existe una cuenta con ese email'));
          }
          reject(err);
        });
    })
  }

  read(email, password) {
    let conn;
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then(conection => {
          conn = conection;
          return conn.query(
            `SELECT * FROM users WHERE email = "${email}" AND password = "${password}"`
          )
        })
        .then(rows => {
          conn.end();
          resolve(JSON.parse(JSON.stringify(rows)));
        })
        .catch(err => {
          if (conn) conn.end();
          console.error(err);
          reject(err);
        });
    })
  }
}

module.exports = UserRepository;