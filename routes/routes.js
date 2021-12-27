const {Router} = require('express')
const router = Router()
const request = require('request')
const {Parser} = require("../parsers/parser")
const parser = new Parser()

const URI = "https://www.gsmarena.com"

router.get('/brands', [],
    async (req, res) => {
        request({
            url: URI + '/makers.php3',
            headers: {
                "User-Agent": "request"
            }
        }, (error, response, html) => {
            if (!error) {
                if(response.statusCode === 404){
                    return res.status(404).json({
                        error: "Page not found"
                    })
                }
                const json = parser.brands(html)
                res.send(json)
            } else {
                res.status(500).json({
                    error: "Error failed fetching source"
                })

            }
        })
    }
)

router.get('/brand/:brand', [],
    async (req, res) => {
        request({
            url: URI + '/' + req.params.brand + '.php',
            headers: {
                "User-Agent": "request"
            }
        }, (error, response, html) => {
            if (!error) {
                if(response.statusCode === 404){
                    return res.status(404).json({
                        error: "Page not found"
                    })
                }
                const json = parser.brand(html)
                res.send(json)
            } else {
                res.status(500).json({
                    error: "Error failed fetching source"
                })
            }
        })
    }
)

router.get('/device/:device', [],
    async (req, res) => {
        request({
            url: URI + '/' + req.params.device + '.php',
            headers: {
                "User-Agent": "request"
            }
        }, function (error, response, html) {
            if (!error) {
                if(response.statusCode === 404){
                    return res.status(404).json({
                        error: "Page not found"
                    })
                }
                const json = parser.device(html)
                res.send(json)
            } else {
                res.status(500).json({
                    error: "Error failed fetching source"
                })
            }
        })
    }
)

router.get('/search/:device', [],
    async (req, res) => {
        request({
            url: URI + '/results.php3?sQuickSearch=yes&sName=' + req.params.device,
            headers: {
                "User-Agent": "request"
            }
        }, (error, response, html) => {
            if (!error) {
                if(response.statusCode === 404){
                    return res.status(404).json({
                        error: "Page not found"
                    })
                }
                const json = parser.search(html)
                res.send(json)
            } else {
                res.status(500).json({
                    error: "Error failed fetching source"
                })
            }
        })
    }
)

router.get('/top', [],
    async (req, res) => {
        request({
            url: URI + '/deals.php3',
            headers: {
                "User-Agent": "request"
            }
        }, (error, response, html) => {
            if (!error) {
                if(response.statusCode === 404){
                    return res.status(404).json({
                        error: "Page not found"
                    })
                }
                const json = parser.top(html)
                res.send(json)
            } else {
                res.status(500).json({
                    error: "Error failed fetching source"
                })
            }
        })
    }
)

router.get('/deals', [],
    async (req, res) => {
        request({
            url: URI + '/deals.php3',
            headers: {
                "User-Agent": "request"
            }
        }, (error, response, html) => {
            if (!error) {
                if(response.statusCode === 404){
                    return res.status(404).json({
                        error: "Page not found"
                    })
                }
                const json = parser.deals(html)
                res.send(json)
            } else {
                res.status(500).json({
                    error: "Error failed fetching source"
                })
            }
        })
    }
)

router.get('/glossary', [],
    async (req, res) => {
        request({
            url: URI + '/glossary.php3',
            headers: {
                "User-Agent": "request"
            }
        }, (error, response, html) => {
            if (!error) {
                if(response.statusCode === 404){
                    return res.status(404).json({
                        error: "Page not found"
                    })
                }
                const json = parser.glossary(html)
                res.send(json)
            } else {
                res.status(500).json({
                    error: "Error failed fetching source"
                })
            }
        })
    }
)

router.get('/glossary/:term', [],
    async (req, res) => {
        request({
            url: URI + '/glossary.php3?term=' + req.params.term,
            headers: {
                "User-Agent": "request"
            }
        }, (error, response, html) => {
            if (!error) {
                if(response.statusCode === 404){
                    return res.status(404).json({
                        error: "Page not found"
                    })
                }
                const json = parser.term(html)
                res.send(json)
            } else {
                res.status(500).json({
                    error: "Error failed fetching source"
                })
            }
        })
    }
)

module.exports = router