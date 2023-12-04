const handleSubmitOrderByCOD = () => {
  const { authorization } = headers || {};
  const token = authorization.split(" ");

  return !!token[1] ? token[1] : null;
};

module.exports = {
  getToken,
};
