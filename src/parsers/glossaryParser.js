const cheerio = require('cheerio')

exports.glossary = (html) => {
    const $ = cheerio.load(html)
    const json = []

    const terms = $('#body').find('.st-text')
    terms.children().each((index, el) => {

        if (index % 2 === 0) {
            json.push({letter: $(el).text(), list: []})
        } else {
            const terms = $(el).find('a')
            terms.each((i, ele) => {
                const link = $(ele).attr('href').replace('glossary.php3?term=', '')
                const name = $(ele).text()

                const a = {
                    link: link,
                    name: name,
                }
                json[Math.floor(index / 2)].list.push(a)
            })
        }
    })

    return json
}

exports.term = (html) => {
    const $ = cheerio.load(html)
    const body = $('#body')
    const title = body.find('.review-header .article-hgroup h1').text()
    const text = body.find('.st-text').first().html()

    return {
        title: title,
        html: text
    }
}