const request = require('request')
const {success, failure} = require("../utils/response")

exports.send = (res, url, func) => {
    try {
        request({
            url: url,
            headers: {
                "User-Agent": "request"
            }
        }, (error, response, html) => {
            if (!error) {
                if (response.statusCode === 404) {
                    return failure(res, "Page not found", 404)
                }
                success(res, func(html))
            } else {
                failure(res, error)
            }
        })
    } catch (error) {
        failure(res, error)
    }
}