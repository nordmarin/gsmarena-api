const request = require("../utils/request")
const parser = require("../parsers/dealsParser")

exports.list = async (req, res) => {
    /*
    #swagger.tags = ['Hot deals']
    #swagger.summary = 'Hot deals'
    */
    request.send(res, process.env.URI + '/deals.php3', parser.deals)
}