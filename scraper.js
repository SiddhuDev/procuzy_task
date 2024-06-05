const puppeteer = require('puppeteer');

async function scrapeMedium(topic) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = `https://medium.com/search?q=${encodeURIComponent(topic)}`;

    await page.goto(url, { waitUntil: 'networkidle2' });

    const articles = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.postArticle')).slice(0, 5).map(article => ({
            title: article.querySelector('h3') ? article.querySelector('h3').innerText : 'No Title',
            author: article.querySelector('.ds-link') ? article.querySelector('.ds-link').innerText : 'Unknown Author',
            publicationDate: article.querySelector('time') ? article.querySelector('time').getAttribute('datetime') : 'Unknown Date',
            url: article.querySelector('a') ? article.querySelector('a').href : 'No URL'
        }));
    });

    await browser.close();
    return articles;
}

module.exports = scrapeMedium;