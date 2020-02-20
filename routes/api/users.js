const express = require("express");

// using express router

const router = express.Router();

// validate result

const { check, validationResult } = require("express-validator");

// bring in user model, gravatar, bcrypt

const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

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
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if there are errors..
      // send bad request of 400
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists!" }] });
      }
      // Get user's gravatar
      const avatar = gravatar.url(email, {
        // s: size of pic, r: no nudes, d, default avatar
        s: "200",
        r: "pg",
        d: "mm"
      });

      // create instance of user, encrypt password with bcrypt
      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // return jsonwebtoken
      res.send("User registered");
    } catch (err) {
      // something wrong with the server
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// export router

module.exports = router;
