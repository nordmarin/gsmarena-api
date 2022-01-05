const cheerio = require('cheerio')

exports.search = (html) => {
    const $ = cheerio.load(html)
    let json = []

    const phones = $('.makers').find('li')
    phones.each((i, el) => {
        const phone = {
            name: $(el).find('span').html().split('<br>').join(' '),
            img: $(el).find('img').attr('src'),
            url: $(el).find('a').attr('href').replace('.php', ''),
            description: $(el).find('img').attr('title')
        }
        json.push(phone)
    })

    return json
}