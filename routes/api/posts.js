const express = require("express");
const router = express.Router();

//@route GET /api/profiles/test
//@desc Tests Profiles js
//@access 
router.get("/test", (req, res) => res.json({ msg: "Post works" }));

module.exports = router;
