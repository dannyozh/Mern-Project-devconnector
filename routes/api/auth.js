const express = require("express");

// using express router

const router = express.Router();

// creating a route

// @route GET api/auth
// @desc Test route
// @access Public
router.get("/", (req, res) => res.send("Auth Route"));

// export router

module.exports = router;
