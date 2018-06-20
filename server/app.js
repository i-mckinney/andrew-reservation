const path = require('path');
const express = require('express');
const db = require('../database/db.js');

let app = express();

app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/restaurant/:restaurant_id/:date', function(req, res) {
  db.grabTimeSlots(req.params.restaurant_id, req.params.date, function(error, data) {
    if (error) {
      res.sendStatus(500);
    }
    res.status(200).send(data); 
  }); 
});  

app.post('/restaurant/:restaurant_id/:date/:time', function(req, res) {
  db.addTimeSlot(req.params.restaurant_id, req.params.date, req.params.time, function(error, data) {
    if (error) {
      res.sendStatus(500)
    } else {
      res.status(201)
    }
  })
})

app.put('/restaurant/:restaurant_id/:date', function(req, res) {
  db.updateTimeSlot(req.params.restaurant_id, req.params.date, function(error, data) {
    if (error) {
      res.sendStatus(400)
    } else {
      res.sendStatus(202)
    }
  })
})

app.delete('/restaurant/:restaurant_id/:date/:time', function(req, res) {
  db.deleteTimeSlot(req.params.restaurant_id, req.params.date, req.params.time, function(error, data) {
    if (error) {
      res.sendStatus(400)
    } else {
      res.sendStatus(204)
    }
  })
})
   
module.exports = app;
 