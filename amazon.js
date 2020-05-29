const puppeteer = require('puppeteer');
const $ = require('cheerio');
const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

const url = 'https://www.amazon.in/Sony-WH-1000XM3-Wireless-Cancellation-Headphones/dp/B07HZ8JWCL/ref=sr_1_1?crid=2H3HG077N2Q33&dchild=1&keywords=sony+1000xm3+headphone&qid=1590515590&sprefix=sony+100%2Caps%2C368&sr=8-1';

async function configureBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    return page;
}

async function checkPrice(page) {
    await page.reload();
    let html = await page.evaluate(() => document.body.innerHTML);
    // console.log(html);

    $('#priceblock_ourprice', html).each(function() {
        let price = $(this).text();
        // console.log(price);
        let currentPrice = Number(price.replace(/[^0-9.-]+/g,""));

        if (currentPrice < 25000) {
            console.log("BUY!!!! " + currentPrice);
            sendNotification(currentPrice);
        }
    });
}

async function startTracking() {
    const page = await configureBrowser();
  
    let job = new CronJob('* */30 * * * *', function() { //runs every 30 minutes in this config
      checkPrice(page);
    }, null, true, null, null, true);
    job.start();
}

async function sendNotification(price) {

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mdaqib0111@gmail.com',
        pass: 'abc1234@'
      }
    });
  
    let textToSend = 'Price dropped to ' + price;
    let htmlText = `<h3>Hi, Please click the link below to avail the offer : </h3><br>${url}`;
  
    let info = await transporter.sendMail({
      from: '"Price Tracker by AQIB" <mdaqib0111@gmail.com>',
      to: "mdaquib327@gmail.com",
      subject: 'Price dropped to ' + price, 
      text: textToSend,
      html: htmlText
    });
  
    console.log("Message sent: %s", info.messageId);
  }

startTracking();