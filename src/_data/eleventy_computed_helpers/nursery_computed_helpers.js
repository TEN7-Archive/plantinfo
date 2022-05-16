const getPlantInfoData = require("../plant_info_data.js");

const {
  objectHasOwnProperties,
  isArrayWithItems,
  getNurseryDetails,
  getNurserySpecialties,
  createLinkList,
  createNurseryPermalinkPath
} = require("../../_data/helpers.js");
const {isObject, getCollectionPathData} = require("../helpers.js");

module.exports = {
  async getEleventyPlantInfoData(configData, plant_info_data) {
    if (
      isObject(configData)
    ) {
      plant_info_data = await getPlantInfoData(configData);
    }

    return plant_info_data;
  },

  async getEleventyNurseriesData(plant_info_data, nurseries_data) {
    if (isObject(plant_info_data)) {
      nurseries_data = getCollectionPathData(plant_info_data, ['nurseries', 'data']);
    }

    return nurseries_data;
  },

  getEleventyNursery(data, nursery) {
    if (isObject(data)) {
      if (
        objectHasOwnProperties(data, ['nursery'])
      ) {
        nursery = data['nursery'];
      }
    }

    return nursery;
  },

  getEleventyNurseryHasData(nursery, has_nursery_data) {
    if (isObject(nursery)) {
      if (
        objectHasOwnProperties(nursery, ['data'])
      ) {
        has_nursery_data = true;
      }
    }

    return has_nursery_data;
  },

  getEleventyNurseryData(nursery, has_nursery_data, nursery_data) {
    if (has_nursery_data) {
      nursery_data = nursery['data'];
    }

    return nursery_data;
  },

  getEleventyNurseryDetails(has_nursery_data, nursery_data, nursery_details) {
    if (has_nursery_data) {
      nursery_details = getNurseryDetails(nursery_data);
    }

    return nursery_details;
  },

  getEleventyNurseryTitle(has_nursery_data, nursery_details, title) {
    if (has_nursery_data) {
      if (objectHasOwnProperties(nursery_details, ['name'])) {
        title = nursery_details['name'];
      }
    }

    return title;
  },

  getEleventyNurserySpecialties(has_nursery_data, nursery_data, nursery_specialties) {
    if (has_nursery_data) {
      nursery_specialties = getNurserySpecialties(nursery_data);
    }

    return nursery_specialties;
  },

  getEleventyNurserySpecialtiesLinkList(nurseries_data, nursery_specialties, nursery_specialties_link_list) {
    if (
      isObject(nurseries_data) &&
      isArrayWithItems(nursery_specialties)
    ) {
      nursery_specialties_link_list = createLinkList(nurseries_data, nursery_specialties, 'nursery_category', 'specialties', 'nursery_category');
    }

    return nursery_specialties_link_list;
  },

  getEleventyNurseryPermalinkPath(nursery, nursery_permalink_path) {
    if (isObject) {
      nursery_permalink_path = createNurseryPermalinkPath(nursery);
    }

    return nursery_permalink_path;
  },

  async getEleventyNurseryDataset(data, configData) {
    let eleventyNurseryDataset =
      {
        nursery: {},
        has_nursery_data: false,
        nursery_data: {},
        nursery_details: {},
        nursery_specialties: [],
        nursery_specialties_link_list: [],
        nursery_permalink_path: '',
        title: '',
      },
      plant_info_data = [],
      nurseries_data = []
    ;

    plant_info_data = await module.exports.getEleventyPlantInfoData(
      configData,
      plant_info_data
    );

    nurseries_data = await module.exports.getEleventyNurseriesData(
      plant_info_data,
      nurseries_data
    );

    eleventyNurseryDataset['nursery'] = module.exports.getEleventyNursery(
      data,
      eleventyNurseryDataset['nursery']
    );

    eleventyNurseryDataset['has_nursery_data'] = module.exports.getEleventyNurseryHasData(
      eleventyNurseryDataset['nursery'],
      eleventyNurseryDataset['has_nursery_data']
    );
    // console.log(eleventyNurseryDataset['has_nursery_data']);

    eleventyNurseryDataset['nursery_data'] = module.exports.getEleventyNurseryData(
      eleventyNurseryDataset['nursery'],
      eleventyNurseryDataset['has_nursery_data'],
      eleventyNurseryDataset['nursery_data']
    );

    eleventyNurseryDataset['nursery_details'] = module.exports.getEleventyNurseryDetails(
      eleventyNurseryDataset['has_nursery_data'],
      eleventyNurseryDataset['nursery_data'],
      eleventyNurseryDataset['nursery_details']
    );

    eleventyNurseryDataset['title'] = module.exports.getEleventyNurseryTitle(
      eleventyNurseryDataset['has_nursery_data'],
      eleventyNurseryDataset['nursery_details'],
      eleventyNurseryDataset['title']
    );
    // console.log('nursery title');
    // console.log(eleventyNurseryDataset['title']);

    eleventyNurseryDataset['nursery_specialties'] = module.exports.getEleventyNurserySpecialties(
      eleventyNurseryDataset['has_nursery_data'],
      eleventyNurseryDataset['nursery_data'],
      eleventyNurseryDataset['nursery_specialties']
    );

    // console.log('nursery specialties');
    // console.log(eleventyNurseryDataset['nursery_specialties']);

    eleventyNurseryDataset['nursery_specialties_link_list'] = module.exports.getEleventyNurserySpecialtiesLinkList(
      nurseries_data,
      eleventyNurseryDataset['nursery_specialties'],
      eleventyNurseryDataset['nursery_specialties_link_list']
    );

    eleventyNurseryDataset['nursery_permalink_path'] = module.exports.getEleventyNurseryPermalinkPath(
      eleventyNurseryDataset['nursery'],
      eleventyNurseryDataset['nursery_permalink_path']
    );

    // console.log('nursery permalink path');
    // console.log(eleventyNurseryDataset['nursery_permalink_path']);

    return eleventyNurseryDataset;
  }
}
