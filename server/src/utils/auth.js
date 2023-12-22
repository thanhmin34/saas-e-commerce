const { User } = require("../models");
const { generateToken } = require("../config/verifyToken");

const handleLoginByPhone = async (params) => {
  const { phone } = params || {};
  try {
    const user = await User.findOne({
      where: { phone_number: phone },
    });
    if (!user?.id) {
      return notificationMessageError(res, "Incorrect account");
    }
    const token = generateToken(user?.id);
    user.token = token;
    const saveUser = await user.save();
    return saveUser ? token : false;
  } catch (error) {
    return notificationMessageError(res, error);
  }
};

const handleRegisterByPhone = async (params) => {
  const { phone, firstName, lastName } = params || {};
  try {
    const newUser = await User.create({
      phone_number: phone,
      firstname: firstName,
      lastname: lastName,
    });

    if (!newUser?.id) {
      return notificationMessageError(res, "Internal Server Error");
    }
    return true;
  } catch (error) {
    return notificationMessageError(res, error);
  }
};

module.exports = {
  handleLoginByPhone,
  handleRegisterByPhone,
};
