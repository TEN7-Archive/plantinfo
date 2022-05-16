const {
  getEleventyNurseryDataset
} = require("../../_data/eleventy_computed_helpers/nursery_computed_helpers.js");
module.exports = (configData) => {
  return {
    eleventyComputed: {
      eleventyNursery: {
        dataset: async data => await getEleventyNurseryDataset(data, configData)
      }
    }
  }
};
