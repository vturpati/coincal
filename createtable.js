const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('coincal.db');

db.run('CREATE TABLE coincal(date text,desc text, votes text)');

db.close();