const parser = require("../parsers/searchParser")
const request = require("../utils/request")

exports.device = async (req, res) => {
    /*
    #swagger.tags = ['Catalog']
    #swagger.summary = 'Find devices by free text'
    #swagger.parameters['device'] = {
        schema: 'xiaomi'
    }
    */
    request.send(res, process.env.URI + '/res.php3?sSearch=' + req.params.device, parser.search)
}
