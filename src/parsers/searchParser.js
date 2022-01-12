const cheerio = require('cheerio')

exports.search = (html) => {
    const $ = cheerio.load(html)
    const json = []

    const phones = $('.makers').find('li')
    phones.each((i, el) => {
        const imgBlock = $(el).find('img')
        const phone = {
            name: $(el).find('span').html().split('<br>').join(' '),
            img: imgBlock.attr('src'),
            url: $(el).find('a').attr('href').replace('.php', ''),
            description: imgBlock.attr('title')
        }
        json.push(phone)
    })

    return json
}