const pg = require('pg');
// const login = require('./pw.js');

// const connection = `postgres://${login.login.username}:${login.login.password}@docker.internal.host/bookings`;
const config = {
  user: 'cameron',
  password: 'sucks',
  host: 'ec2-18-217-228-95.us-east-2.compute.amazonaws.com' || 'localhost',
  port: '5432',
  database: 'bookings'
}


const client = new pg.Client(config);

client.connect().then(()=> console.log('connected to db')).catch(err => console.log('this is the err, ', err));

let grabTimeSlots = (rest_id, date, cb) => {
    let getQuery = `SELECT * FROM bookings WHERE restaurant_id=${rest_id} AND book_date='${date}';`
    client.query(getQuery, (err,res) => {
        if(err) {
            cb(err, null);
        } else {
            cb(null, res);
        }
    })
}

let addTimeSlot = (user_id,rest_id,table_id,partysize,notes,bookdate,booktime, cb) => {
    let postQuery = `INSERT INTO bookings (user_id,restaurant_id,table_id,partysize,notes,book_date,book_time) VALUES (${user_id},${rest_id},${table_id},${partysize},'${notes}','${bookdate}','${booktime}');`
    client.query(postQuery, (err, res) => {
        if(err) {
            console.log(err)
            cb(err, null);
        } else {
            cb(null, res);
        }
    })
}

let deleteTimeSlot = (rest_id, userid, bookdate, booktime, cb) => {
    let deleteQuery = `DELETE FROM bookings WHERE restaurant_id=${rest_id} AND book_date='${bookdate}' AND book_time='${booktime}' AND user_id=${userid};`
    client.query(deleteQuery, (err,res) => {
        if(err) {
            cb(err, null);
        } else {
            cb(null, res);
        }
    })
}

let updateTimeSlot = (rest_id, userid, bookdate, partysize, cb) => {
    let updateQuery = `UPDATE bookings SET partysize=${partysize} WHERE restaurant_id=${rest_id} AND book_date='${bookdate}' AND user_id=${userid};`
    client.query(updateQuery, (err,res) => {
        if(err) {
            cb(err, null);
        } else {
            cb(null, res);
        }
    })
}

module.exports.grabTimeSlots = grabTimeSlots;
module.exports.addTimeSlot = addTimeSlot;
module.exports.deleteTimeSlot = deleteTimeSlot;
module.exports.updateTimeSlot = updateTimeSlot; 