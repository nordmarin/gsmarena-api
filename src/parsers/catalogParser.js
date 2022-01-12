const cheerio = require('cheerio')

exports.brands = (html) => {
    const $ = cheerio.load(html)
    const json = []
    const brands = $('table').find('td')
    brands.each((i, el) => {
        const aBlock = $(el).find('a')
        const brand = {
            name: aBlock.text().replace(' devices', '').replace(/[0-9]/g, ""),
            devices: $(el).find('span').text().replace(' devices', ''),
            url: aBlock.attr('href').replace('.php', '')
        }
        json.push(brand)
    })

    return json
}


exports.brand = (html) => {
    const $ = cheerio.load(html)
    const json = []
    const phones = $('.makers').find('li')

    phones.each((i, el) => {
        const imgBlock = $(el).find('img')
        const phone = {
            name: $(el).find('span').text(),
            img: imgBlock.attr('src'),
            url: $(el).find('a').attr('href').replace('.php', ''),
            description: imgBlock.attr('title')
        }
        json.push(phone)
    })

    const pagesData = []
    const pages = $('.review-nav .nav-pages').find('a, strong')
    pages.each((i, el) => {
        const page = {
            number: parseInt($(el).text()),
        }
        if (el.name !== 'strong') {
            page.url = $(el).attr('href').replace('.php', '')
        } else {
            page.active = true
        }
        pagesData.push(page)
    })

    let nextPage = $('a.pages-next').attr('href')
    if (nextPage) {
        if (nextPage.indexOf('#') >= 0) {
            nextPage = ''
        } else {
            nextPage = nextPage.replace('.php', '')
        }
    }

    let prevPage = $('a.pages-prev').attr('href')
    if (prevPage) {
        if (prevPage.indexOf('#') >= 0) {
            prevPage = ''
        } else {
            prevPage = prevPage.replace('.php', '')
        }
    }

    const data = {
        data: json
    }

    if (prevPage) {
        data.prev = prevPage
    }
    if (nextPage) {
        data.next = nextPage
    }

    if (pagesData.length) {
        data.pages = pagesData
    }

    return data
}


exports.device = (html) => {
    const $ = cheerio.load(html)

    const display_size = $('span[data-spec=displaysize-hl]').text()
    const display_res = $('div[data-spec=displayres-hl]').text()
    const camera_pixels = $('.accent-camera').text()
    const video_pixels = $('div[data-spec=videopixels-hl]').text()
    const ram_size = $('.accent-expansion').text()
    const chipset = $('div[data-spec=chipset-hl]').text()
    const battery_size = $('.accent-battery').text()
    const battery_type = $('div[data-spec=battype-hl]').text()

    const quick_spec = []
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
    const spec_detail = []
    specNode.each((i, el) => {
        const specList = []
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

    return {
        title: title,
        img: img,
        img_url: img_url,
        spec_detail: spec_detail,
        quick_spec: quick_spec
    }
}