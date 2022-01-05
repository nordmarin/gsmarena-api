const {Router} = require('express')
const router = Router()

const controller = require("../controllers/topController")

router.get('/top', controller.list)

module.exports = router