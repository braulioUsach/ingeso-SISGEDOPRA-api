const Repository = require('./repository');
const Helper = require('./helper');

class Transfer {
  static create(params, tokenValues) {
    return new Promise((resolve, reject) => {
      const paramsFormatted = Helper.paramsToCreate(params, tokenValues);
      return Repository.readLastByDocument(params.document)
        .then((row) => {
          if (row.userIdTo !== tokenValues.userId) {
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
}

module.exports = Transfer;
