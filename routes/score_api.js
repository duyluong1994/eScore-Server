var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
var cheerio = require('cheerio');
var TodayMatch = require('../models/TodayMatch.js');



// GET todayMatch
router.get('/',function (req, res) {
    //clear documents on collection
    TodayMatch.remove({},(error) => {
        console.error(error);
    });

    // crawl data todaymatches
    getHLTV().then($ => {
        $('.top-border-hide').find(".hotmatch-box.a-reset").each((_,ele) => {

            //get Game details
            let href = ($(ele).attr('href'));
            let title = ($(ele).attr('title'));
            let time = $('.middleExtra',ele).text();

            //get teamrows
            let country = [];
            let src = [];
            let name = [];
            let scoreR = [];
            let classR = [];
            let scoreG = [];
            let classG = [];

            $('.teamrows',ele).find('.flag').each((j,team) => {
                country[j] = $(team).attr('title');
                src[j] = $(team).attr('src');
            });
            $('.teamrows',ele).find('.team').each((j,team) => {
                name[j] = $(team).text();
            });
            $('.twoRowExtra',ele).find('.livescore.twoRowExtraRow').each((j,team) => {
                $(team).find('span').each((n,span) => {
                    if(n == 0){
                        scoreR[j] = $(span).text();
                        classR[j] = $(span).attr('class');
                    }
                    if(n == 1) {
                        scoreG[j] = $('span',span).text();
                        classG[j] = $('span',span).attr('class');
                    }
                });
            });

            let match = new TodayMatch({
                title: title,
                href: href,
                time: time,
                team1: {
                    country: country[0], flag: {src: src[0]}, name: name[0],
                    gamedata:{
                        round: {score: scoreR[0], class: classR[0]},
                        game: {score: scoreG[0], class: classG[0]}}},
                team2: {
                    country: country[1], flag: {src: src[1]}, name: name[1],
                    gamedata:{
                        round: {score: scoreR[1], class: classR[1]},
                        game: {score: scoreG[1], class: classG[1]}}}
            });

         match.save(function (err, match) {
                    if (err) return console.error(err);
                    console.dir(match);
             console.log(match);
                });
        });
    });
    res.send('api escore runing');
});
module.exports = router;
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function getHLTV() {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto('https://www.hltv.org/');

    // use page.select
    await page.select('select[name="timezone"]', 'Asia/Ho_Chi_Minh');
    await page.evaluate(() => {
        return Promise.resolve(window.scrollTo(0,document.body.scrollHeight));
    });

    await page.waitFor(1000);

    let content = await page.content();
    //timeout(90000000);
    const $ = cheerio.load(content);
    await browser.close();
    return $;
}