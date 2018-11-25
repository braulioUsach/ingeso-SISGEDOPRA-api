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
          console.log("connected ! connection id is " + conn.threadId);
          conn.end(); //release to pool
          resolve();
        })
        .catch(err => {
          console.log("not connected due to error: " + err);
          reject(err);
        });
    })
  }
}

module.exports = UserRepository;