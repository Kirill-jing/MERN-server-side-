const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  let decToken;
  if (token != "undefined" || token != null) {
    decToken = jwt.verify(token, "secret");
    req.userId = decToken.id;
  }
  next();
};
