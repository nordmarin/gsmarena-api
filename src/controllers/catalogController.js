const request = require("../utils/request")
const parser = require("../parsers/catalogParser")

exports.brands = async (req, res) => {
    // #swagger.tags = ['Catalog']
    // #swagger.summary = 'Get all brands'
    request.send(res, process.env.URI + '/makers.php3', parser.brands)
}

exports.brand = async (req, res) => {
    /*
    #swagger.tags = ['Catalog']
    #swagger.summary = 'Get devices by brand'
    #swagger.parameters['brand'] = {
        schema: 'apple-phones-48'
    }
    */
    request.send(res, process.env.URI + '/' + req.params.brand + '.php', parser.brand)
}

exports.device = async (req, res) => {
    /*
    #swagger.tags = ['Catalog']
    #swagger.summary = 'Get device specification'
    #swagger.parameters['device'] = {
        schema: 'apple_iphone_13_pro_max-11089'
    }
    */
    request.send(res, process.env.URI + '/' + req.params.device + '.php', parser.device)
}