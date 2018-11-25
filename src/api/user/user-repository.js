'use strict';

const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'sisgedopra.cjukhdrk5wtn.us-east-2.rds.amazonaws.com',
  ssl: true,
  user: 'insomnia',
  password: 'ingeso_2018',
  connectionLimit: 5,
  database: 'insomnia'
});

class UserRepository {
  ping() {
    return new Promise((resolve, reject) => {
      console.log(pool);
      pool.getConnection()
        .then(conn => {
          console.log(conn);
          return conn.query("SELECT 1 as val")
        })
        .then(rows => {
          console.log(rows);
          conn.end();
          return resolve(rows);
        })
        .catch(err => {
          console.error(err)
          if (conn) conn.end();
          reject(err);
        })
    })
  }
}

module.exports = UserRepository;