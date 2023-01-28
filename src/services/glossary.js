const cheerio = require('cheerio');
const { getDataFromUrl } = require('./utils');

const get = async () => {
    const html = await getDataFromUrl('/glossary.php3');

    const $ = cheerio.load(html);
    const json = [];

    const parentTerms = $('#body').find('.st-text');
    parentTerms.children().each((index, el) => {
        if (index % 2 === 0) {
            json.push({ letter: $(el).text(), list: [] });
        } else {
            const terms = $(el).find('a');
            terms.each((i, ele) => {
                const id = $(ele).attr('href').replace('glossary.php3?term=', '');
                const name = $(ele).text();

                json[Math.floor(index / 2)].list.push({
                    id,
                    name,
                });
            });
        }
    });

    return json;
};

const getTerm = async (term) => {
    const html = await getDataFromUrl(`/glossary.php3?term=${term}`);

    const $ = cheerio.load(html);
    const body = $('#body');
    const title = body.find('.review-header .article-hgroup h1').text();
    const text = body.find('.st-text').first().html();

    return {
        title,
        html: text,
    };
};

module.exports = {
    get,
    getTerm,
};
