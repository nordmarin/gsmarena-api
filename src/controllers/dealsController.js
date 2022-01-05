const request = require("../utils/request")
const parser = require("../parsers/dealsParser")

exports.list = async (req, res) => {
    request.send(res, process.env.URI + '/deals.php3', parser.deals)
}