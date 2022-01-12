const cheerio = require('cheerio')

exports.top = (html) => {
    const $ = cheerio.load(html)
    const json = []

    const ranks = $('.sidebar.col.left').find('.module.module-rankings.s3')
    ranks.each((i, el) => {
        const category = $(el).find('h4').text()
        const rankN = $(el).find('tr')

        const rank = []
        rankN.each((index, ele) => {
            const position = $('td[headers=th3a]', ele).text().replace('.', "")
            if (position !== "") {
                const name = $('nobr', ele).text()
                const url = $('a', ele).attr('href').replace('.php', '')
                const daily_hits = $('td[headers=th3c]', ele).text()

                const a = {
                    position: position,
                    name: name,
                    url: url,
                    daily_hits: daily_hits
                }
                rank.push(a)
            }
        })
        if (category) {
            json.push({
                category: category,
                list: rank
            })
        }
    })

    return json
}