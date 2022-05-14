const {
  objectHasOwnProperties,
  getNurseryDetails
} = require("../../_data/helpers.js");

module.exports = {
  getEleventyNurseryHasData(data, has_nursery_data) {
    if (objectHasOwnProperties(data, ['data'])) {
      has_nursery_data = true;
    }

    return has_nursery_data;
  },

  getEleventyNurseryData(data, has_nursery_data, nursery_data) {
    if (has_nursery_data) {
      nursery_data = data['data'];
    }

    return nursery_data;
  },

  getEleventyNurseryDetails(data, has_nursery_data, nursery_data, nursery_details) {
    if (has_nursery_data) {
      nursery_details = getNurseryDetails(nursery_data);
    }

    return nursery_details;
  },

  getEleventyNurseryTitle(data, has_nursery_data, nursery_details, title) {
    if (has_nursery_data) {
      if (objectHasOwnProperties(nursery_details, ['name'])) {
        title = nursery_details['name'];
      }
    }

    return title;
  },

  getEleventyNurseryDataset(data) {
    let eleventyNurseryDataset =
      {
        has_nursery_data: false,
        nursery_data: {},
        nursery_details: {},
        title: '',
      };

    eleventyNurseryDataset['has_nursery_data'] = module.exports.getEleventyNurseryHasData(
      data,
      eleventyNurseryDataset['has_nursery_data']
    );

    eleventyNurseryDataset['nursery_data'] = module.exports.getEleventyNurseryData(
      data,
      eleventyNurseryDataset['has_nursery_data'],
      eleventyNurseryDataset['nursery_data']
    );

    eleventyNurseryDataset['nursery_details'] = module.exports.getEleventyNurseryDetails(
      data,
      eleventyNurseryDataset['has_nursery_data'],
      eleventyNurseryDataset['nursery_data'],
      eleventyNurseryDataset['nursery_details']
    );

    eleventyNurseryDataset['title'] = module.exports.getEleventyNurseryTitle(
      data,
      eleventyNurseryDataset['has_nursery_data'],
      eleventyNurseryDataset['nursery_details'],
      eleventyNurseryDataset['title']
    );

    return eleventyNurseryDataset;
  }
}
