const jwt = require("jsonwebtoken");
const { User } = require("../models");

const auth = async (req, res, next) => {
  const auth = req.header("Authorization");
  const token = auth ? auth.replace("Bearer ", "") : null;
  if (!token) {
    return res
      .status(401)
      .send({ error: "Not authorized to access this resource" });
  }
  const jwtToken = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const user = await User.findOne({
      where: {
        id: jwtToken?.id,
      },
    });
    if (!user) {
      return res
        .status(401)
        .send({ error: "Not authorized to access this resource" });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Not authorized to access this resource" });
  }
};
module.exports = auth;
