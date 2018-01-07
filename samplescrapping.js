const scrapeIt = require("scrape-it");
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('coincal.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
   });

// Promise interface
scrapeIt("http://www.coinmarketcal.com/?form[month]=&form[year]=&form[coin][]=Bitcoin+(BTC)&form[sort_by]=&form[submit]=",
{
    // Fetch the articles
    articles: {
        listItem: ".content-box-general"
      , data: {

            // Get the article date and convert it into a Date object
            createdAt: {
                selector: ".content-box-info .added-date",
            },
            description: {
                selector: ".content-box-info .description",
            },
            votes: {
                selector: ".content-box-info .votes",
            }
        }
    }

}
).then(page => {
    var arr = page.articles;
    for (var i = 0; i < arr.length; i++){
      
    var date = arr[i].createdAt;
    var desc = arr[i].description;
    var votes = arr[i].votes;
    db.run(`INSERT INTO coincal(date ,desc , votes) VALUES(?,?,?)`, [date,desc,votes], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
       // console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
    //console.log(date + " "+ desc + " "+votes);
    }
})

