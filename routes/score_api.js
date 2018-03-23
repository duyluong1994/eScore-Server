var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
chrome_bin = ENV.fetch('GOOGLE_CHROME_SHIM', nil);
chrome_opts = chrome_bin ? { "chromeOptions" : { "binary" : chrome_bin } } : {};



// GET todayMatch
router.get('/',function (req, res) {
  /*  const {Builder, until} = require('selenium-webdriver');
    let driver = new Builder()
        .forBrowser('chrome')
        //
        .build();*/
    var webdriver = require('selenium-webdriver');

    var chromeCapabilities = webdriver.Capabilities.chrome();
//setting chrome options to start the browser fully maximized
    var chromeOptions = {
        'args': ['--test-type', '--start-maximized']
    };
    chromeCapabilities.set('chromeOptions', chrome_opts);
    var driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();
    const hltv_url = 'https://www.hltv.org/';

    driver.get(hltv_url)
        .then(() => driver.wait(until.titleIs('CS:GO News & Coverage | HLTV.org'), 1000))
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
            //Do whatever you want with the result

            //console.log(item.html());
        })
        .then(() => {
            driver.quit();
        });
    res.render('pages/score_api');
});
module.exports = router;