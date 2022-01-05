const {Router} = require('express')
const router = Router()

const controller = require("../controllers/searchController")

router.get('/search/:device', controller.device)

module.exports = router