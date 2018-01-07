const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('coincal.db', sqlite3.OPEN_READWRITE, (err) => {
 if (err) {
   console.error(err.message);
 }
 console.log('Connected to the chinook database.');
});

db.serialize(() => {
  var r = [];
 db.each(`SELECT date,desc,votes FROM coincal`, (err, row) => {
   if (err) {
     console.error(err.message);
   }
   r.push(row.date);
  // console.log(row.date + "\t" + row.desc+ "\t" + row.votes);
 });

console.log(r);
});
db.close((err) => {
 if (err) {
   console.error(err.message);
 }
 console.log('Close the database connection.');
});