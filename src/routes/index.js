const {Router} = require('express')
const router = Router()

const catalogRoutes = require("./catalog")
const dealsRoutes = require("./deals")
const topRoutes = require("./top")
const glossaryRoutes = require("./glossary")
const searchRoutes = require("./search")

router.use("/", catalogRoutes);
router.use("/", dealsRoutes);
router.use("/", topRoutes);
router.use("/", glossaryRoutes);
router.use("/", searchRoutes);

module.exports = router