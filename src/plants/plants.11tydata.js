const {
  getEleventyPlantDataset
} = require("../_data/eleventy_computed_helpers/plant_computed_helpers.js");

module.exports = (configData) => {
  return {
    eleventyComputed: {
      eleventyPlant: {
        dataset: async data => await getEleventyPlantDataset(data, configData)
      }
    }
  }
};
