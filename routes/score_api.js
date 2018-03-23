var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');



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
        const matches = await page.evaluate(() => [...document.querySelectorAll('.teambox.match')].map(elem => elem.innerHTML));

        console.log(matches);

        await browser.close();
    })();
    res.render('pages/score_api');
});
module.exports = router;