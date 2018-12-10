const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'sisgedopra.cjukhdrk5wtn.us-east-2.rds.amazonaws.com',
  user: 'insomnia',
  password: 'ingeso_2018',
  connectionLimit: 2,
  database: 'insomnia',
});

class UserRepository {
  static ping() {
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((conn) => {
          console.log(`connected ! connection id is ${conn.threadId}`);
          conn.end();
          resolve({
            connected: true,
            threadId: conn.threadId,
          });
        })
        .catch((err) => {
          console.error(err);
          reject(new Error(console.log(`Can't connect to DB: ${err}`)));
        });
    });
  }

  static create(params) {
    let conn;
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((conection) => {
          conn = conection;
          return conn.query(
            'INSERT INTO documents(name, creatorId, type) VALUES (?,?, ?)',
            params,
          );
        })
        .then((rows) => {
          conn.end();
          resolve(rows);
        })
        .catch((err) => {
          if (conn) conn.end();
          console.error(err.message);
          reject(err);
        });
    });
  }

  static readByUser(userId) {
    let conn;
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((conection) => {
          conn = conection;
          return conn.query(
            `SELECT *,
              (SELECT userIdTo
              FROM transfers t
              WHERE t.documentId = d.id ORDER BY id DESC LIMIT 1) AS currentUserAssigned
            FROM documents d 
            WHERE d.creatorId = ${userId};`,
          );
        })
        .then((rows) => {
          conn.end();
          const aux = JSON.parse(JSON.stringify(rows));
          return resolve(aux);
        })
        .catch((err) => {
          if (conn) conn.end();
          console.error(err);
          return reject(err);
        });
    });
  }


  static read(id) {
    let conn;
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((conection) => {
          conn = conection;
          return conn.query(
            `SELECT *,  (SELECT userIdTo
              FROM transfers t
              WHERE t.documentId = d.id ORDER BY id DESC LIMIT 1) AS currentUserAssigned
              FROM documents d
              WHERE d.id = "${id}";`,
          );
        })
        .then((rows) => {
          conn.end();
          const aux = JSON.parse(JSON.stringify(rows));
          if (aux.length !== 1) {
            return reject(new Error('Documento no encontrado'));
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
