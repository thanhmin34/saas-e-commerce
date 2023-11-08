const checkFilterByCategory = (category) => {
  if (category) {
    if (Array.isArray(category)) {
      return category;
    }
    return [category];
  }
  return [];
};

module.exports = { checkFilterByCategory };
