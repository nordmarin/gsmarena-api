const request = require("../utils/request")
const parser = require("../parsers/topParser")

exports.list = async (req, res) => {
    /*
    #swagger.tags = ['Top of devices']
    #swagger.summary = 'Top of devices'
    */
    request.send(res, process.env.URI + '/deals.php3', parser.top)
}