const { TAX_AMOUNT } = require("../constants/variables");

const getTotalPriceCart = (productList) => {
  const total =
    productList?.length > 0
      ? productList.reduce((acc, cur) => {
          const { productCartItem, quantity } = cur || {};
          const { special_price, price } = productCartItem || {};
          if (special_price) return (acc += special_price * quantity);
          return (acc += price * quantity);
        }, 0)
      : 0;

  return +total.toFixed(2);
};

const getTotalExclPriceCart = (total) => {
  if (total <= 0) return 0;
  const total_excl = +(TAX_AMOUNT * +total) + total;

  return +total_excl.toFixed(2);
};

const getDiscountAmount = (total, discount) => {
  if (total <= 0) return 0;
  const value = +total * +discount;
  return +value.toFixed(2);
};

const getTotalPayment = (total, tax_amount, shipping_amount, discount) => {
  if (total <= 0) return 0;
  const value = total + tax_amount + shipping_amount - discount;
  return +value.toFixed(2);
};

const getProductByCart = (products) => {
  if (products?.length <= 0) return [];

  return products?.map((item) => {
    const { productCartItem, product_id, quantity, options } = item || {};

    const { name, sku, image, price, special_price, special_from_date } =
      productCartItem || {};
    const currentDate = new Date();

    const newPrice = special_price
      ? special_price * quantity
      : price * quantity;
    return {
      product_id,
      quantity,
      price: newPrice,
      options,
      name,
      sku,
      image,
    };
  });
};

module.exports = {
  getTotalPriceCart,
  getTotalExclPriceCart,
  getDiscountAmount,
  getTotalPayment,
  getProductByCart,
};
