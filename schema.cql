CREATE KEYSPACE IF NOT EXISTS booking
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  };

USE booking;



CREATE TABLE IF NOT EXISTS bookings (
  rest_id text,
  book_date text,
  book_time text,
  email text,
  id int,
  individualtableid int,
  userName text,
  userActualName text,
  
  phoneNumber text,
  partySize int,
  notes text,
  
  PRIMARY KEY (rest_id, book_date)
);


TEST TABLE
CREATE TABLE IF NOT EXISTS bookings (
  rest_id text,
  book_date text,
  book_time text,
  tableid int,
  userName text,
  userActualName text,
  email text,
  phoneNumber text,
  partySize int,
  notes text,
  PRIMARY KEY (rest_id, book_date, book_time, tableid)
);