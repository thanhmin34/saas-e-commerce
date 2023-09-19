const notificationMessageError = (res, message) => {
  return res.status(400).json({
    status: false,
    message,
  });
};

const notificationMessageSuccess = (res, results = {}, status = 200) => {
  return res.status(status).json({
    ...results,
  });
};

module.exports = {
  notificationMessageError,
  notificationMessageSuccess,
};
