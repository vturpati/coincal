const scrapeIt = require("scrape-it")

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
    console.log(page)
})

