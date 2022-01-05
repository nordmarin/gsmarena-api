const success = (res, data) => {
    res.json(data)
}

const failure = (res, error, status = 500) => {
    res.status(status).json({
        error: `Something went wrong: ${error}`,
    })
}

module.exports = {
    success,
    failure
}