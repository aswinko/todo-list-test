const jwt = require("jsonwebtoken");

const createJWT = (username, userId, duration) => {
  const payload = {
    username,
    userId,
    duration,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: duration,
  });
};

module.exports = createJWT;