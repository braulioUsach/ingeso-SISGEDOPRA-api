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
          console.log(`not connected due to error: ${err}`);
          reject(new Error('Can`t connect to DB' + err));
        });
    })
  }
}

module.exports = UserRepository;