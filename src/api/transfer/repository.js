const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'sisgedopra.cjukhdrk5wtn.us-east-2.rds.amazonaws.com',
  user: 'insomnia',
  password: 'ingeso_2018',
  connectionLimit: 2,
  database: 'insomnia',
});

class TransferRepository {
  static create(params) {
    let conn;
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((conection) => {
          conn = conection;
          return conn.query(
            'INSERT INTO transfers (documentId, userIdFrom, userIdTo) VALUES (?, ?, ?)',
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

  static read(id) {
    let conn;
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((conection) => {
          conn = conection;
          return conn.query(
            `SELECT * FROM documents WHERE id = "${id}"`,
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

  static readLastByDocument(documentId) {
    let conn;
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((conection) => {
          conn = conection;
          return conn.query(
            `SELECT MAX(id) as id, documentId, userIdFrom, userIdTo
            FROM transfers
            WHERE documentId = ${documentId};`,
          );
        })
        .then((rows) => {
          conn.end();
          const aux = JSON.parse(JSON.stringify(rows));
          if (aux.length !== 1) {
            return reject(new Error('No existen transferencias para este documento'));
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

module.exports = TransferRepository;
