const puppeteer = require('puppeteer')
const $ = require('cheerio')


let url = "https://www.flipkart.com/realme-x2-pearl-green-64-gb/p/itm75023903eb431"

async function configureBrowser(){

    let browser = await puppeteer.launch()
    let page = await browser.newPage()

    await page.goto(url)
    return page;
}

async function checkAvailabilty(page){
    await page.reload()
    let html = await page.evaluate(() => document.body.innerHTML);
    // console.log(html)

    $("._2kuvG8", html).each(function(){
        let availability = $(this).text();
        // console.log(availability)
        if(availability){
            console.log("In stock")
        } else {
            console.log("Out of stock")
        }
    })

}

async function monitor(){
    let page = await configureBrowser()
    await checkAvailabilty(page)
}
monitor()