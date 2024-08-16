const { getUser } = require("../utils/auth");
const { getToken } = require("../utils/tokenAuth");

async function restrictToLoggedInUserOnly(req, res, next) {

  // const userUid = req.cookies?.uid;
  // if (!userUid) return res.redirect("/login");
  // const user = getUser(userUid);

  const token  = req.cookies?.uid;
  if (!token) return res.redirect("/login");
  const user = getToken(token);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}


module.exports = {
    restrictToLoggedInUserOnly,
  };