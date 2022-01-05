const {Router} = require('express')
const router = Router()

const controller = require("../controllers/glossaryController")

router.get('/glossary', controller.list)
router.get('/glossary/:term', controller.term)

module.exports = router