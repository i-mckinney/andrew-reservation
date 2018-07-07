require('newrelic');

const path = require('path');
const express = require('express');
const db = require('../database/pg.js');
var bodyParser = require('body-parser');
// const db = require('../database/cassdb.js')

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use('/restaurant/:restaurant_id/', express.static(path.join(__dirname, '../public')));

app.get('/restaurant/:restaurant_id/:date', function(req, res) {
  db.grabTimeSlots(req.params.restaurant_id, req.params.date, function(error, data) {
    if (error) {
    res.status(400).send(error);      
    } else {
    res.send(data.rows); 
    }
  }); 
});  

app.post('/restaurant/:restaurant_id/:userid/', function(req, res) {
  db.addTimeSlot(req.params.userid,req.params.restaurant_id, req.body.tableid, req.body.partysize, req.body.notes, req.body.bookdate, req.body.booktime, function(error, data) {
    if (error) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

app.put('/restaurant/:restaurant_id/:userid/:date/', function(req, res) {
  db.updateTimeSlot(req.params.restaurant_id, req.params.userid, req.params.date, req.body.partysize, function(error, data) {
    if (error) {
      res.sendStatus(400);
    } else {
      res.sendStatus(202);
    }
  });
});

app.delete('/restaurant/:restaurant_id/:userid/:date/:time/', function(req, res) {
  db.deleteTimeSlot(req.params.restaurant_id, req.params.userid, req.params.date, req.params.time,  function(error, data) {
    if (error) {
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});
   
module.exports = app;
