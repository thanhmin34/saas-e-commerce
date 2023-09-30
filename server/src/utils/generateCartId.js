const crypto = require("crypto");

const generateCartId = () => {
  const cryptoId = crypto.randomBytes(16).toString("hex");
  const cartId = `${Date.now()}${cryptoId}`;
  return cartId;
};
module.exports = {
  generateCartId,
};
