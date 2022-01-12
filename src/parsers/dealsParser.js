const cheerio = require('cheerio')

exports.deals = (html) => {
    const $ = cheerio.load(html)
    const json = []
    const devices = $('#body').find('.pricecut')

    devices.each((i, el) => {
        const image = $(el).find('.row a img').attr('src')
        const url = $(el).find('.row a.image').attr('href')
        const title = $(el).find('.row .phone div h3').text()
        const link = $(el).find('.row .phone div a').attr('href').replace('.php', '')
        const description = $(el).find('.row .phone p a').text()

        const deal = {
            memory: $(el).find('.row .phone .deal a.memory').text(),
            store_img: $(el).find('.row .phone .deal a.store img').attr('src'),
            price: $(el).find('.row .phone .deal a.price').text(),
            discount: $(el).find('.row .phone .deal a.discount').text(),
        }

        const device = {
            image: image,
            url: url,
            title: title,
            link: link,
            description: description,
            deal: deal
        }

        const history = $(el).find('.history .stats')
        const historyN = []
        history.children().each((index, elem) => {
            if (index % 2 === 0) {
                historyN.push({time: $(elem).text()})
            } else {
                historyN[Math.floor(index / 2)].price = $(elem).text()
            }
        })

        device.history = historyN

        json.push(device)
    })

    return json
}