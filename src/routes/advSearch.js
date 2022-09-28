const {Router} = require('express')
const router = Router()

const controller = require("../controllers/advancedSearchController")

router.get('/advSearch/:device', controller.device)

module.exports = router
