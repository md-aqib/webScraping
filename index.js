const puppeteer = require('puppeteer')
const $ = require('cheerio')


let url = "https://www.imdb.com/title/tt0111161/?ref_=nv_sr_srsg_0"

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

    $("._1vC4OE _3qQ9m1", html).each(function(){
        let availability = $(this).text();
        console.log(availability)
    })

}

async function monitor(){
    let page = await configureBrowser()
    await checkAvailabilty(page)
}
monitor()