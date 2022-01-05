const {Router} = require('express')
const router = Router()

const controller = require("../controllers/catalogController")

router.get('/brands', controller.brands)
router.get('/brand/:brand', controller.brand)
router.get('/device/:device', controller.device)

module.exports = router