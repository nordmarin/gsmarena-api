const request = require("../utils/request")
const parser = require("../parsers/glossaryParser")

exports.list = async (req, res) => {
    request.send(res, process.env.URI + '/glossary.php3', parser.glossary)
}

exports.term = async (req, res) => {
    request.send(res, process.env.URI + '/glossary.php3?term=' + req.params.term, parser.term)
}