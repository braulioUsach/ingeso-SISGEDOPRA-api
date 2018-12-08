const {
  expect,
} = require('chai');

describe('Document: Helper', () => {
  let User;
  beforeEach(() => {
    Helper = require('../../../../src/api/user/helper');
  });


  it('return an array with parameters to create a document', (done) => {
    const params = {
      name: 'Test Document',
    };

    const formatted = Helper.paramsToCreate(params);
    expect(formatted).to.be.an('array');
    expect(formatted).to.have.length(2);
  });

  it('should reject when missing parameters: lastname', (done) => {
    const params = {
      firstname: 'Pepito',
    };
    const user = new User(params);

    user.create()
      .catch((err) => {
        expect(err).to.be.an('error');
        expect(err.message).to.be.equals('Missing paramaters');
        done();
      });
  });

  it('should return a new valid JWT', (done) => {
    const login = new Login();

    login.create('user', 'password')
      .then((response) => {
        expect(response).to.be.an('object');
        expect(response).to.have.property('type');
        expect(response).to.have.property('token');
        expect(response).to.have.property('expiresIn');
        done();
      });
  });
});
