const express = require("express");

// using express router

const router = express.Router();

// creating a route

// @route GET api/users
// @desc Test route
// @access Public
router.get("/", (req, res) => res.send("User Route"));

// export router

module.exports = router;
