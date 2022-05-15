const {
  getEleventyNavigationDataset
} = require("./eleventy_computed_helpers/navigation_helpers.js");

const {
  getEleventyPlantLetterDirectoryDataset
} = require("./eleventy_computed_helpers/letter_directory_computed_helpers.js");

module.exports = {
  eleventyPlantLetterDirectory: {
    dataset: data => getEleventyPlantLetterDirectoryDataset(data),
  }
  // eleventyNavigation: {
  //   dataset: data => getEleventyNavigationDataset(data),
  // }
};
