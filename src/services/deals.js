const cheerio = require('cheerio');
const { getDataFromUrl, getPrice } = require('./utils');

const getDeals = async () => {
    const html = await getDataFromUrl('/deals.php3');

    const $ = cheerio.load(html);
    const json = [];
    const devices = $('#body').find('.pricecut');

    devices.each((i, el) => {
        const img = $(el).find('.row a img').attr('src');
        const url = $(el).find('.row a.image').attr('href');
        const name = $(el).find('.row .phone div h3').text();
        const id = $(el).find('.row .phone div a').attr('href').replace('.php', '');
        const description = $(el).find('.row .phone p a').text();

        const price = getPrice($(el).find('.row .phone .deal a.price').text());
        const deal = {
            memory: $(el).find('.row .phone .deal a.memory').text(),
            storeImg: $(el).find('.row .phone .deal a.store img').attr('src'),
            price: price.price,
            currency: price.currency,
            discount: parseFloat($(el).find('.row .phone .deal a.discount').text()),
        };

        const device = {
            id,
            img,
            url,
            name,
            description,
            deal,
        };

        const historyList = $(el).find('.history .stats');
        const history = [];

        historyList.children().each((index, elem) => {
            if (index % 2 === 0) {
                history.push({ time: $(elem).text() });
            } else {
                const historyPrice = getPrice($(elem).text());
                history[Math.floor(index / 2)].price = historyPrice.price;
                history[Math.floor(index / 2)].currency = historyPrice.currency;
            }
        });

        device.history = history;

        json.push(device);
    });

    return json;
};

module.exports = {
    getDeals,
};
