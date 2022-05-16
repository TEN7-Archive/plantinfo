const {
  getEleventyNurseryCategoryDataset
} = require("../../_data/eleventy_computed_helpers/nursery_category_computed_helpers.js");

module.exports = (configData) => {
  return {
    eleventyComputed: {
      eleventyNurseryCategory: {
        dataset: async data => await getEleventyNurseryCategoryDataset(data, configData)
      }
    }
  }
};
