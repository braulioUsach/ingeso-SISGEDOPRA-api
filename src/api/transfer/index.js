const Repository = require('./repository');
const DocumentRepository = require('../document/repository');
const Helper = require('./helper');

class Transfer {
  static create(params, tokenValues) {
    return new Promise((resolve, reject) => {
      const paramsFormatted = Helper.paramsToCreate(params, tokenValues);
      return DocumentRepository.read(params.document)
        .then((doc) => {
          if ((doc.currentUserAssigned === null && doc.creatorId !== tokenValues.userId) || doc.currentUserAssigned !== tokenValues.userId) {
            reject(new Error('No puedes transferir el documento, ya que no eres el actual responsable del documento'));
          }

          return Repository.create(paramsFormatted);
        })
        .then((row) => {
          resolve({
            id: row.insertId,
            document: params.document,
            from: tokenValues.userId,
            to: params.to,
          });
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  static pendingByUser(userId) {
    return new Promise((resolve, reject) => Repository.readPendingByUser(userId)
      .then((rows) => {
        resolve(rows);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      }));
  }

  static read(id, tokenValues) {
    return new Promise((resolve, reject) => Repository.read(id)
      .then((row) => {
        if (row.userIdFrom !== tokenValues.userId && row.userIdTo !== tokenValues.userId) {
          reject(new Error('No autorizado a ver transferencia'));
        }
        return resolve(row);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      }));
  }

  static approve(id, tokenValues) {
    console.log('llando al método de transfer');
    return new Promise((resolve, reject) => Transfer.read(id, tokenValues)
      .then(() => Repository.approve(id))
      .then(() => Transfer.read(id, tokenValues))
      .then(rows => resolve(rows))
      .catch((err) => {
        console.error(err);
        reject(err);
      }));
  }
}

module.exports = Transfer;
