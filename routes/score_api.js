var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var webdriver = require('selenium-webdriver');



// GET todayMatch
router.get('/',function (req, res) {
    //const {Builder, until} = require('selenium-webdriver');
    let driver = new webdriver.Builder()
        .forBrowser('phantomjs')
        .build();
    const hltv_url = 'https://www.hltv.org/';

    driver.get(hltv_url)
        .then(() => driver.wait(function() {
            return driver.getTitle().then(function(title) {
                console.log(title);
                return title === 'CS:GO News & Coverage | HLTV.org';
            });
        }, 5000))
        .then(() => driver.executeScript("window.scrollTo(0, document.body.scrollHeight);"))
        .then(() => driver.getPageSource())
        .then((source) => {
            const $ = cheerio.load(source);
            var items = [];
            $('.top-border-hide').find(".hotmatch-box.a-reset").each((_,ele) => {
                items.push($(ele));
            });
            console.log(items[0]);
            console.log(items[0].html());
            console.log(items[0].text());
            console.log($.html());
            //Do whatever you want with the result

            //console.log(item.html());
        })
        .then(() => {
            driver.quit();
        });
    res.render('pages/score_api');
});
module.exports = router;