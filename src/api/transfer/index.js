const Repository = require('./repository');
const DocumentRepository = require('../document/repository');
const Helper = require('./helper');

class Transfer {
  static create(params, tokenValues) {
    return new Promise((resolve, reject) => {
      const paramsFormatted = Helper.paramsToCreate(params, tokenValues);
      const q = [];
      q.push(Repository.readLastByDocument(params.document));
      q.push(DocumentRepository.read(params.document));
      return Promise.all(q)
        .then((promises) => {
          const isCreator = promises[1].creatorId === tokenValues.userId;
          const hasTransfers = !(promises[0].length === 0);
          if (!isCreator && (!hasTransfers || promises[0].userIdTo !== tokenValues.userId)) {
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
