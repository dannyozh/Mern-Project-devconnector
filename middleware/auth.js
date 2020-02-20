const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // middleware has access to req and res, next is a callback that runs after we're done to move on to the next middleware

  //   Get Token from header
  const token = req.header("x-auth-token");

  //  Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //   Verify token if there is one

  try {
    //   decode token. function takes in token + secret
    const decoded = jwt.verify(token, config.get("jwtToken"));

    // set req user to user that's in that decoded token
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
