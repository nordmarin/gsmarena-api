const request = require('request')
,   cachedRequest = require('cached-request')(request)
,   cacheDirectory = "/tmp/cache";

const {success, failure} = require("../utils/response")
cachedRequest.setCacheDirectory(cacheDirectory);
cachedRequest.setValue('ttl', process.env.TTL);

exports.send = (res, url, func) => {
    try {
        cachedRequest({
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