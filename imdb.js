// using cheerio and puppeteer
const puppeteer = require('puppeteer')
const $ = require('cheerio')


let url = "https://www.imdb.com/title/tt0111161/?ref_=nv_sr_srsg_0"

async function configureBrowser(){

    let browser = await puppeteer.launch()
    let page = await browser.newPage()

    await page.goto(url)
    return page;
}

async function movieData(page){
    await page.reload()
    let html = await page.evaluate(() => document.body.innerHTML);
    // console.log(html)

    $(".title_wrapper > h1", html).each(function(){
        let movieName = $(this).text();
        console.log(movieName)
    })

    $(".ratingValue > strong > span", html).each(function(){
        let ratings = $(this).text();
        console.log(ratings)
    })

    $(".imdbRating > a > span", html).each(function(){
        let ratCount = $(this).text();
        console.log(ratCount)
    })

}

async function monitor(){
    let page = await configureBrowser()
    await movieData(page)
}
monitor()