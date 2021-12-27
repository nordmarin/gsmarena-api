const cheerio = require('cheerio')

class Parser {

    brands(html) {
        const $ = cheerio.load(html)
        let json = []
        const brands = $('table').find('td')
        brands.each((i, el) => {
            let brand = {
                name: $(el).find('a').text().replace(' devices', '').replace(/[0-9]/g, ""),
                devices: $(el).find('span').text().replace(' devices', ''),
                url: $(el).find('a').attr('href').replace('.php', '')
            }
            json.push(brand)
        })
        return json
    }


    brand(html) {
        const $ = cheerio.load(html)
        let json = []

        const phones = $('.makers').find('li')
        phones.each((i, el) => {
            let phone = {
                name: $(el).find('span').text(),
                img: $(el).find('img').attr('src'),
                url: $(el).find('a').attr('href').replace('.php', ''),
                description: $(el).find('img').attr('title')
            }
            json.push(phone)
        })

        let pagesData = []
        const pages = $('.review-nav .nav-pages').find('a, strong')
        pages.each((i, el) => {
            console.log(el.name)
            let phone = {
                number: $(el).text()
            }
            if (el.name !== 'strong') {
                phone.url = $(el).attr('href').replace('.php', '')
            }
            pagesData.push(phone)
        })

        const nextPage = $('a.pages-next').attr('href').replace('.php', '')
        const prevPage = $('a.pages-prev').attr('href').replace('.php', '')

        const data = {
            data: json,
            pages: pagesData,
            next: nextPage,
            prev: prevPage
        }

        return data
    }


    device(html) {
        const $ = cheerio.load(html)

        const display_size = $('span[data-spec=displaysize-hl]').text()
        const display_res = $('div[data-spec=displayres-hl]').text()
        const camera_pixels = $('.accent-camera').text()
        const video_pixels = $('div[data-spec=videopixels-hl]').text()
        const ram_size = $('.accent-expansion').text()
        const chipset = $('div[data-spec=chipset-hl]').text()
        const battery_size = $('.accent-battery').text()
        const battery_type = $('div[data-spec=battype-hl]').text()

        let quick_spec = []
        quick_spec.push({name: 'Display size', value: display_size})
        quick_spec.push({name: 'Display resolution', value: display_res})
        quick_spec.push({name: 'Camera pixels', value: camera_pixels})
        quick_spec.push({name: 'Video pixels', value: video_pixels})
        quick_spec.push({name: 'RAM size', value: ram_size})
        quick_spec.push({name: 'Shipset', value: chipset})
        quick_spec.push({name: 'Battery size', value: battery_size})
        quick_spec.push({name: 'Battery type', value: battery_type})


        const title = $('.specs-phone-name-title').text()
        const img = $('.specs-photo-main a img').attr('src')
        const img_url = $('.specs-photo-main a').attr('href')

        const specNode = $('table')
        let spec_detail = []
        specNode.each((i, el) => {
            let specList = []
            const category = $(el).find('th').text()
            const specN = $(el).find('tr')
            specN.each((index, ele) => {
                const a = {
                    name: $('td.ttl', ele).text(),
                    value: $('td.nfo', ele).text()
                }
                specList.push(a)
            })
            if (category) {
                spec_detail.push({
                    category: category,
                    specs: specList
                })
            }
        })

        const data = {
            title: title,
            img: img,
            img_url: img_url,
            spec_detail: spec_detail,
            quick_spec: quick_spec
        }

        return data
    }


    search(html) {
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


    top(html) {
        const $ = cheerio.load(html)
        let json = []

        const ranks = $('.sidebar.col.left').find('.module.module-rankings.s3')
        ranks.each((i, el) => {
            const category = $(el).find('h4').text()
            const rankN = $(el).find('tr')

            let rank = []
            rankN.each((index, ele) => {

                const position = $('td[headers=th3a]', ele).text().replace('.', "")
                if (position !== "") {
                    const name = $('nobr', ele).text()
                    const url = $('a', ele).attr('href').replace('.php','')
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


    deals(html) {
        const $ = cheerio.load(html)
        let json = []

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
            let historyN = []
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


    glossary(html) {
        const $ = cheerio.load(html)
        let json = []

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

    term(html) {
        const $ = cheerio.load(html)
        const title = $('#body').find('.review-header .article-hgroup h1').text()
        const text = $('#body').find('.st-text').first().html()

        const json = {
            title: title,
            html: text
        }

        return json
    }
}

module.exports.Parser = Parser