const mergeProducts = (productsOld, productsCurrent) => {
  const temp = {};

  [...productsOld, ...productsCurrent].forEach((element) => {
    const id = element?.product_id;
    if (temp[id]) {
      temp[id].dataValues.quantity += element?.dataValues?.quantity;
    } else {
      temp[id] = { ...element };
    }
  });

  return Object.values(temp);
};

module.exports = { mergeProducts };
