const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const scrapeMedium = require('./scraper');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let articles = [];

app.post('/scrape', async (req, res) => {
    const { topic } = req.body;
    try {
        articles = await scrapeMedium(topic);
        res.status(200).json({ message: 'Scraping successful', articles });
    } catch (error) {
        res.status(500).json({ message: 'Scraping failed', error: error.message });
    }
});

app.get('/articles', (req, res) => {
    res.status(200).json(articles);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});