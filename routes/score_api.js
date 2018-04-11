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
            var href = ($(ele).attr('href'));
            var title = ($(ele).attr('title'));
            var time = $('.middleExtra',ele).text();

            //get teamrows

                var country1 = $('.flag', '.teamrow', ele).first().attr('title');
                var src1 = $('.flag', '.teamrow', ele).first().attr('src');
                var name1 = $('.team', '.teamrow', ele).first().text();

                var scoreR1 = $('.livescore.twoRowExtraRow','.twoRowExtra', ele).first().children('span').first().text();
                var classR1 = $('.livescore.twoRowExtraRow','.twoRowExtra', ele).first().children('span').first().attr('class');
                var scoreG1 = $('.livescore.twoRowExtraRow','.twoRowExtra', ele).first().children('span').next().children('span').text();
                var classG1 = $('.livescore.twoRowExtraRow','.twoRowExtra', ele).first().children('span').next().children('span').attr('class');

                var country2 = $('.flag', '.teamrow', ele).next().attr('title');
                var src2 = $('.flag', '.teamrow', ele).next().attr('src');
                var name2 = $('.team', '.teamrow', ele).next().text();

                var scoreR2 = $('.livescore.twoRowExtraRow','.twoRowExtra', ele).next().children('span').first().text();
                var classR2 = $('.livescore.twoRowExtraRow','.twoRowExtra', ele).next().children('span').first().attr('class');
                var scoreG2 = $('.livescore.twoRowExtraRow','.twoRowExtra', ele).next().children('span').next().children('span').text();
                var classG2 = $('.livescore.twoRowExtraRow','.twoRowExtra', ele).next().children('span').next().children('span').attr('class');



            /*if($(ele).find('.teamrow').first().html() == null){
                console.log($(ele).find('.placeholderrow').first().html());
            }else{
                console.log($('.flag','.teamrow',ele).first().attr('title'));
            }*/
            var match = new TodayMatch({
                title: title,
                href: href,
                time: time,
                team1: {
                    country: country1, flag: {src: src1}, name: name1,
                    gamedata:{
                        round: {score: scoreR1, class: classR1},
                        game: {score: scoreG1, class: classG1}}},
                team2: {
                    country: country2, flag: {src: src2}, name: name2,
                    gamedata:{
                        round: {score: scoreR2, class: classR2},
                        game: {score: scoreG2, class: classG2}}}
            });

         match.save(function (err, match) {
                    if (err) return console.error(err);
                    console.dir(match);
                });

        });
    });
    res.render('pages/score_api');
});
module.exports = router;
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function getHLTV() {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto('https://www.hltv.org/');
    timeout(1000);
    // use page.select
    await page.select('select[name="timezone"]', 'Asia/Ho_Chi_Minh');
    timeout(1000);
    let content = await page.content();
    const $ = cheerio.load(content);
    await browser.close();
    return $;
}