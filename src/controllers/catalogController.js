const request = require("../utils/request")
const parser = require("../parsers/catalogParser")

exports.brands = async (req, res) => {
    request.send(res, process.env.URI + '/makers.php3', parser.brands)
}

exports.brand = async (req, res) => {
    request.send(res, process.env.URI + '/' + req.params.brand + '.php', parser.brand)
}

exports.device = async (req, res) => {
    request.send(res, process.env.URI + '/' + req.params.device + '.php', parser.device)
}