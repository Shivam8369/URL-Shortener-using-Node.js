const jwt = require("jsonwebtoken");

const secret = "shivam_key@pass";

function setToken(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    secret
  );
}

function getToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
}

module.exports = {
  setToken,
  getToken,
};
