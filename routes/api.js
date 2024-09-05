const router = require("express").Router()

router.use("/sign", require("./api/sign"))
router.use("/users", require("./api/users"))
router.use("/dogs", require("./api/dogs"))
router.use("/follow", require("./api/follow"))


module.exports = router