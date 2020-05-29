// using only puppeteer, return an object
const puppeteer = require('puppeteer')


(async() => {
    let movieUrl = "https://www.imdb.com/title/tt0111161/?ref_=nv_sr_srsg_0"

    let browser = await puppeteer.launch()
    let page = await puppeteer.newPage()

    await page.goto(movieUrl)

    let data = page.evaluate(() => {

        let name = document.querySelector('div[class="title_wrapper"] > h1').innerText
        let ratings = document.querySelector('span[itmeprop="ratingValue"]').innerText
        let ratingCount = document.querySelector('span[itmeprop="ratingCount"]').innerText

        return {
            name,
            ratings,
            ratingCount
        }

    })

    console.log(data)

    await browser.close()
})();