const request = require("../utils/request")
const parser = require("../parsers/topParser")

exports.list = async (req, res) => {
    request.send(res, process.env.URI + '/deals.php3', parser.top)
}