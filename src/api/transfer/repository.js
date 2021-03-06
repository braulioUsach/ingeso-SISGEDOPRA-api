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
            `SELECT * FROM transfers WHERE id = ${id}`,
          );
        })
        .then((rows) => {
          conn.end();
          const aux = JSON.parse(JSON.stringify(rows));
          if (aux.length !== 1) {
            return reject(new Error('Transferencia no encontrada'));
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

  static readPendingByUser(userId) {
    let conn;
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((conection) => {
          conn = conection;
          return conn.query(
            `SELECT
              d.id as documentId,
              d.name as documentName,
              u.id as senderId,
              u.firstName as senderName,
              u.lastName as senderLastName,
              t.id as transferId,
              t.created as transferDate
            FROM transfers t, documents d, users u
            WHERE t.userIdTo = ${userId}
            AND t.approved = 0
            AND t.userIdFrom = u.id
            AND d.finished = 0
            AND t.documentId = d.id;`,
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

  static readApprovedByUser(userId) {
    console.log('debería estar llamando a este repo');
    let conn;
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((conection) => {
          conn = conection;
          return conn.query(
            `SELECT
              d.id as documentId,
              d.name as documentName,
              u.id as senderId,
              u.firstName as senderName,
              u.lastName as senderLastName,
              t.id as transferId,
              t.created as transferDate
            FROM transfers t, documents d, users u
            WHERE t.userIdTo = ${userId}
            AND t.approved = 1
            AND d.finished = 0
            AND t.userIdFrom = u.id
            AND t.documentId = d.id;`,
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

  static approve(id) {
    let conn;
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((conection) => {
          conn = conection;
          return conn.query(
            `UPDATE transfers SET approved=1 WHERE id = ${id};`,
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

  static readByDocument(documentId) {
    let conn;
    return new Promise((resolve, reject) => {
      pool.getConnection()
        .then((conection) => {
          conn = conection;
          return conn.query(
            `SELECT
            t.id as transferId,
             t.userIdFrom as userFromId,
             ( SELECT firstName FROM users uf WHERE uf.id = t.userIdFrom ) as userFromName,
             ( SELECT lastName FROM users uf WHERE uf.id = t.userIdFrom ) as userFromLastName,
             t.userIdTo as userToId,
             ( SELECT firstName FROM users uf WHERE uf.id = t.userIdTo ) as userToName,
             ( SELECT lastName FROM users uf WHERE uf.id = t.userIdTo ) as userToLastName,
             t.created as createdAt,
             t.approved as approved,
             t.updated as approvedAt
            FROM transfers t
            WHERE t.documentId = ${documentId};`,
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

module.exports = TransferRepository;
