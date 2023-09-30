const generateProductVariations = (options) => {
  const variations = [];

  function generateVariations(currentIndex, currentVariation) {
    if (currentIndex === options.length) {
      // Đã đến cuối danh sách tùy chọn, thêm sản phẩm con vào danh sách
      variations.push(currentVariation);
      return;
    }

    const option = options[currentIndex];

    for (const value of option.value) {
      const newVariation = { ...currentVariation };
      newVariation[option.label] = value;
      // Gọi đệ quy để xử lý tùy chọn tiếp theo
      generateVariations(currentIndex + 1, newVariation);
    }
  }

  generateVariations(0, {});

  return variations;
};
module.exports = { generateProductVariations };
