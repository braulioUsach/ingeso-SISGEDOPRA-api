const Repository = require('./repository');
const Helper = require('./helper');

class Document {
  static create(params, tokenValues) {
    return new Promise((resolve, reject) => {
      const paramsFormatted = Helper.paramsToCreate(params, tokenValues);
      return Repository.create(paramsFormatted)
        .then((row) => {
          resolve({
            id: row.insertId,
            name: params.name,
            type: params.type,
          });
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  static read(id, tokenValues) {
    return new Promise((resolve, reject) => Repository.read(id)
      .then((row) => {
        if (row.creatorId !== tokenValues.userId && row.currentUserAssigned !== tokenValues.userId) {
          reject(new Error('No tienes permisos para leer el documento'));
        }
        return resolve(row)
      })
      .catch((err) => {
        console.error(err);
        return reject(err);
      }));
  }

  static readByUser(userId) {
    return new Promise((resolve, reject) => Repository.readByUser(userId)
      .then(row => resolve(row))
      .catch((err) => {
        console.error(err);
        return reject(err);
      }));
  }

  static allowedReceivers(id, tokenValues) {
    return new Promise((resolve, reject) => Repository.readByUser(userId)
      .then(row => resolve(row))
      .catch((err) => {
        console.error(err);
        return reject(err);
      }));
  }
}

module.exports = Document;
