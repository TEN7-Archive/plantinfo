const {
  getEleventyNavigationDataset
} = require("./eleventy_computed_helpers/navigation_helpers.js");

const {
  getEleventyNurseryDataset
} = require("./eleventy_computed_helpers/nursery_computed_helpers.js");

const {
  getEleventyPlantLetterDirectoryDataset
} = require("./eleventy_computed_helpers/letter_directory_computed_helpers.js");

module.exports = {
  eleventyNursery: {
    dataset: data => getEleventyNurseryDataset(data),
  },
  eleventyPlantLetterDirectory: {
    dataset: data => getEleventyPlantLetterDirectoryDataset(data),
  }
  // eleventyNavigation: {
  //   dataset: data => getEleventyNavigationDataset(data),
  // }
};
