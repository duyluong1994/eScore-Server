var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
var cheerio = require('cheerio');



// GET todayMatch
router.get('/',function (req, res) {
    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    (async () => {
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.goto('https://www.hltv.org/');
        await timeout(1000);
        /*const matches = await page.evaluate(() => [...document.querySelectorAll('.teambox.match')].map(elem => elem.innerHTML));
        console.log(matches);*/
        let content = await page.content();
        const $ = cheerio.load(content);
        var items = [];
        $('.top-border-hide').find(".hotmatch-box.a-reset").each((_,ele) => {
            items.push($(ele));
        });
        console.log(items[0]);
        console.log(items[0].html());
        console.log(items[0].text());

        await browser.close();
    })();
    res.render('pages/score_api');
});
module.exports = router;