var pg = require('pg');
var request = require('request'); 
var expect = require('chai').expect
const login = require('../database/pw.js');


describe('Persistent Reservation Module Server', function() {
    const connection = `postgres://${login.login.username}:${login.login.password}@localhost:5432/bookings`;
    const client = new pg.Client(connection);

    beforeEach(function() {
      client.connect();  
    });
  
    afterEach(function() {
      client.end();
    });

    it('Should receive all bookings given a restaurant Id and Date', function(done) {
        request('http://localhost:3001/restaurant/10912/2018-09-23/', (err, response, body) => {
            // console.log(response)
            expect(response.statusCode).to.equal(200);
            done();
        })
    });

    // req.params.userid,req.params.restaurant_id, req.body.tableid, req.body.partysize, req.body.notes, req.body.bookdate, req.body.booktime
    it('Should insert posted bookings to the DB', function(done) {
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3001/restaurant/10912/95012/',
          json: {
            tableid: 109871,
            partysize:10,
            notes: 'aksdjaklsjdklajsdlkjadjklaklsdj asda s a sdas edqweqweqwe q eqweq alksdj',
            bookdate: '2019-10-10',
            booktime: '19:00'
          }
        }, (err, response) => {
          if(err) {
            throw err;
          }
            expect(response.statusCode).to.equal(201);
            done();
          });
      });

      it('Should update posted bookings to the DB', function(done) {
        request({
          method: 'PUT',
          uri: 'http://127.0.0.1:3001/restaurant/10912/95012/2019-10-10/',
            json: {
              partysize: 8
            }
          }, (err, response) => {
            if(err) {
              throw err;
            }
            expect(response.statusCode).to.equal(202);
            done();
            });
        });

      it('Should Delete posted bookings to the DB', function(done) {
        request({
          method: 'DELETE',
          uri: 'http://127.0.0.1:3001/restaurant/10912/95012/2019-10-10/19:00/'
          }, (err, response) => {
            if(err) {
              throw err;
            }
            expect(response.statusCode).to.equal(204);
            done();
            });
        });
      
  });
