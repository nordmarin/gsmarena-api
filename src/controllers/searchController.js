const parser = require("../parsers/searchParser")
const request = require("../utils/request")

exports.device = async (req, res) => {
    /*
    #swagger.tags = ['Catalog']
    #swagger.summary = 'Find devices by keyword'
    #swagger.parameters['device'] = {
        schema: 'casio'
    }
    */
    request.send(res, process.env.URI + '/results.php3?sQuickSearch=yes&sName=' + req.params.device, parser.search)
}