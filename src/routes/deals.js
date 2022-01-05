const {Router} = require('express')
const router = Router()

const controller = require("../controllers/dealsController")

router.get('/deals', controller.list)

module.exports = router