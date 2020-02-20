const express = require("express");

// using express router

const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

const { check, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const config = require("config");

const bcrypt = require("bcryptjs");

// @route GET api/auth
// @desc Test route
// @access

// adding "auth" to below makes it protected
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// export router

// @route POST api/auth
// @desc  Authenticate user & get token
// @access Public

router.post(
  "/",
  [
    // must have valid name and email using check
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if there are errors..
      // send bad request of 400
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //   match user's email and password
      //   becrypt has method called compare. which takes plain pw and encrypted pw and tells you if there's a match
      const isMatch = await bcrypt.compare(password, user.password);

      //   if match/not match
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // return jsonwebtoken

      const payload = {
        user: {
          // mongoose uses an abstraction, so id instead of _id
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      // something wrong with the server
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// export router

module.exports = router;
