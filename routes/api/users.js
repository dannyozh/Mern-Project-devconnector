const express = require("express");

// using express router

const router = express.Router();

// validate result

const { check, validationResult } = require("express-validator");

// @route POST api/users
// @desc  Register user
// @access Public

router.post(
  "/",
  [
    // must have valid name and email using check
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if there are errors..
      // send bad request of 400
      return res.status(400).json({ errors: errors.array() });
    }

    // See if user exists

    //
    res.send("User Route");
  }
);

// export router

module.exports = router;
