const checkFilterByCategory = (category) => {
  if (category) {
    if (Array.isArray(category)) {
      return category;
    }
    return [category];
  }
  return [];
};

const totalRating = (review_list) => {
  if (review_list?.length <= 0) return 0;

  const total = review_list.reduce((acc, cur) => {
    const { rating = 0 } = cur || {};
    return acc + rating;
  }, 0);
  const starAverage = total / review_list?.length;
  return +starAverage.toFixed(2);
};

const getShippingAddress = (address) => {
  if (!address) return null;
  const { tempLatLng } = address || {};
  // address.tempLatLng = JSON.parse(tempLatLng);
  return address;
};

module.exports = { getShippingAddress, checkFilterByCategory, totalRating };
