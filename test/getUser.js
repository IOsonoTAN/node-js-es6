describe('[test model user.js] try to get user', function() {
  before(function() {
    request = require('supertest')
    expect = require('chai').expect
    app = require('../server')
  })

  it('should return 200 and get 2 datas', function(done) {
    request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect(200, function(req, res){
        expect(res.status).eql(200)
        expect(res.body).to.have.length(2)
        done()
      })
  })

  it('should return 200 and once user has id "56c0b9c3b8024509134d8201"', function(done) {
    request(app)
      .get('/user/56c0b9c3b8024509134d8201')
      .expect('Content-Type', /json/)
      .expect(200, function(req, res){
        expect(res.status).eql(200)
        expect(res.body[0]._id).eql('56c0b9c3b8024509134d8201')
        expect(res.body).to.have.length(1)
        done()
      })
  })
})