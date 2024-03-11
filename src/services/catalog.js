const cheerio = require('cheerio');
const { getDataFromUrl } = require('./utils');

const getBrands = async () => {
    const html = await getDataFromUrl('/makers.php3');

    const $ = cheerio.load(html);
    const json = [];
    const brands = $('table').find('td');

    brands.each((i, el) => {
        const aBlock = $(el).find('a');
        json.push({
            id: aBlock.attr('href').replace('.php', ''),
            name: aBlock.text().replace(' devices', '').replace(/[0-9]/g, ''),
            devices: parseInt($(el).find('span').text().replace(' devices', ''), 10),
        });
    });

    return json;
};

const getNextPage = ($) => {
    const nextPage = $('a.prevnextbutton[title="Next page"]').attr('href');
    if (nextPage) {
        return nextPage.replace('.php', '');
    }
    return false;
};

const getDevices = ($, devicesList) => {
    const devices = [];
    devicesList.each((i, el) => {
        const imgBlock = $(el).find('img');
        devices.push({
            id: $(el).find('a').attr('href').replace('.php', ''),
            name: $(el).find('span').text(),
            img: imgBlock.attr('src'),
            description: imgBlock.attr('title'),
        });
    });

    return devices;
};

const getBrand = async (brand) => {
    let html = await getDataFromUrl(`/${brand}.php`);

    let $ = cheerio.load(html);
    let json = [];

    let devices = getDevices($, $('.makers').find('li'));
    json = [...json, ...devices];

    while (getNextPage($)) {
        html = await getDataFromUrl(`/${getNextPage($)}.php`);
        $ = cheerio.load(html);
        devices = getDevices($, $('.makers').find('li'));
        json = [...json, ...devices];
    }

    return json;
};

const getDevice = async (device) => {
    const html = await getDataFromUrl(`/${device}.php`);
    const $ = cheerio.load(html);

    const displaySize = $('span[data-spec=displaysize-hl]').text();
    const displayRes = $('div[data-spec=displayres-hl]').text();
    const cameraPixels = $('.accent-camera').text();
    const videoPixels = $('div[data-spec=videopixels-hl]').text();
    const ramSize = $('.accent-expansion').text();
    const chipset = $('div[data-spec=chipset-hl]').text();
    const batterySize = $('.accent-battery').text();
    const batteryType = $('div[data-spec=battype-hl]').text();

    const quickSpec = [];
    quickSpec.push({ name: 'Display size', value: displaySize });
    quickSpec.push({ name: 'Display resolution', value: displayRes });
    quickSpec.push({ name: 'Camera pixels', value: cameraPixels });
    quickSpec.push({ name: 'Video pixels', value: videoPixels });
    quickSpec.push({ name: 'RAM size', value: ramSize });
    quickSpec.push({ name: 'Chipset', value: chipset });
    quickSpec.push({ name: 'Battery size', value: batterySize });
    quickSpec.push({ name: 'Battery type', value: batteryType });

    const name = $('.specs-phone-name-title').text();
    const img = $('.specs-photo-main a img').attr('src');

    const specNode = $('table');
    const detailSpec = [];

    specNode.each((i, el) => {
        const specList = [];
        const category = $(el).find('th').text();
        const specN = $(el).find('tr');

        specN.each((index, ele) => {
            specList.push({
                name: $('td.ttl', ele).text(),
                value: $('td.nfo', ele).text(),
            });
        });
        if (category) {
            detailSpec.push({
                category,
                specifications: specList,
            });
        }
    });

    return {
        name,
        img,
        detailSpec,
        quickSpec,
    };
};

module.exports = {
    getBrands,
    getBrand,
    getDevice,
};
