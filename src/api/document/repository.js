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
          reject(new Error(`Can't connect to DB: ${err}`));
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

  static readCreatedByUser(userId) {
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
            WHERE d.creatorId = ${userId}
            ORDER By d.id DESC;`,
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

  static readFinishedByUser(userId) {
    let conn;
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((conection) => {
          conn = conection;
          return conn.query(
            `SELECT
              MAX(t.id) as lastTransferId,
              t.created as lastTransferDate,
              d.updated as finishedDate,
              d.id as documentId,
              d.name as documentName,
              u.id as senderId,
              u.firstName as senderName,
              u.lastName as senderLastName
              FROM transfers t, documents d, users u
              WHERE t.userIdTo = ${userId}
              AND t.documentId = d.id
              AND t.approved = 1
              AND d.finished = 1
              AND t.userIdTo = u.id;`,
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

  static updateToFinished(id) {
    let conn;
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((conection) => {
          conn = conection;
          return conn.query(
            `UPDATE documents SET finished=1 WHERE id = ${id};`,
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
}

module.exports = UserRepository;
