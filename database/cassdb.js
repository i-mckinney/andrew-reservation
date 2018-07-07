const cassandra = require('cassandra-driver');
var PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;
const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'],authProvider: new PlainTextAuthProvider('cassandra', 'cassandra'), keyspace: 'booking' });

let grabTimeSlots = (rest_id, date, cb) => {
  const getQuery = `SELECT * FROM bookings WHERE rest_id='${rest_id}' AND book_date='${date}';`;
  client.execute(getQuery)
    .then(result => {
        cb(null, result)
    })
    .catch(err => {
        cb(err, null)
    })
}

let addTimeSlot = (rest_id,date,time,tableid,username,email,phone,partysize,notes,cb) => {
  const postQuery = `INSERT INTO bookings (rest_id,book_date,book_time,tableid,email,notes,partysize,phonenumber,useractualname,username) VALUES ('${rest_id}','${date}','${time}',${tableid},'${username}','${email}','${phone}','${partysize}','${notes}') IF NOT EXISTS;`;
  client.execute(postQuery)
    .then(result => {
        cb(null, result)
    })
}

module.exports.addTimeSlot = addTimeSlot; 
module.exports.grabTimeSlots = grabTimeSlots;