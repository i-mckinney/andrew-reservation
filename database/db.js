const mysql = require('mysql');

let connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  database: process.env.RDS_DB_NAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
});

let grabTimeSlots = (rest_id, date, cb) => {
  let q = 'SELECT * FROM bookings WHERE (restaurant_id = ' + rest_id + ' && date = ' + JSON.stringify(date) + ');';
  connection.query(q, function(error, results) {
    if (error) {
      throw error;
    }
    cb(error, results); 
  });
}
let postTimeSlot = (rest_id, date, time, cb) => {
  let q = 'INSERT INTO bookings (restaurant_id, date, time) VALUES (?, ?, ?)';
  connection.query(q, function(error, results, fields) {
    if (error) {
      throw error;
    }
  });
} 
 
module.exports.grabTimeSlots = grabTimeSlots;
