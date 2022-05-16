const getPlantInfoData = require("../plant_info_data.js");

const {
  objectHasOwnProperties,
  isArrayWithItems,
  isNotEmpty,
  getItemByTypeAndMachineName,
  getNurseryDetails,
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

  getEleventyNurseryByCategory(data, nursery_by_category) {
    if (isObject(data)) {
      if (
        objectHasOwnProperties(data, ['nursery_by_category'])
      ) {
        nursery_by_category = data['nursery_by_category'];
      }
    }

    return nursery_by_category;
  },

  getEleventyNurseryByCategoryHasData(nursery_by_category, has_nursery_by_category_data) {
    if (isObject(nursery_by_category)) {
      if (
        objectHasOwnProperties(nursery_by_category, ['data'])
      ) {
        has_nursery_by_category_data = true;
      }
    }

    return has_nursery_by_category_data;
  },

  getEleventyNurseryByCategoryItemSlugs(nursery_by_category, has_nursery_by_category_data, nursery_by_category_item_slugs) {
    if (has_nursery_by_category_data) {
      nursery_by_category_item_slugs = nursery_by_category['items'];
    }

    return nursery_by_category_item_slugs;
  },

  getEleventyNursery(nursery_by_category_item_slug, nursery_info, nurseries_data) {
    let nursery = getItemByTypeAndMachineName(nurseries_data, 'nursery', nursery_by_category_item_slug, '');

    if (isObject(nursery)) {
      nursery_info['nursery'] = nursery;
    }
    return nursery_info;
  },

  getEleventyNurseryDetails(nursery_info) {
    let nursery_details = {};

    if (isObject(nursery_info)) {
      if (
        objectHasOwnProperties(nursery_info, ['nursery']) &&
        objectHasOwnProperties(nursery_info['nursery'], ['data'])
      ) {
        nursery_details = getNurseryDetails(nursery_info['data']);
      }
    }

    if (
      isObject(nursery_details) &&
      nursery_details !== {}
    ) {
      nursery_info['nursery_details'] = nursery_details;
    }

    return nursery_info;
  },

  getEleventyNurseryTitle(nursery_info) {
    let nursery_title = {};

    if (isObject(nursery_info)) {
      if (
        objectHasOwnProperties(nursery_info, ['nursery_details']) &&
        objectHasOwnProperties(nursery_info['nursery_details'], ['name']) &&
        isNotEmpty(nursery_info['nursery_details']['name'])
      ) {
        nursery_title = nursery_info['nursery_details']['name'];
      }
    }

    if (
      nursery_title !== '') {
      nursery_info['nursery_title'] = nursery_title;
    }

    return nursery_info;
  },

  getEleventyNurseryInfoBySlug(nursery_by_category_item_slug, nurseries, nurseries_data) {
    let nursery_info = {};

    nursery_info = module.exports.getEleventyNursery(nursery_by_category_item_slug, nursery_info, nurseries_data);
    nursery_info = module.exports.getEleventyNurseryDetails(nursery_info);
    nursery_info = module.exports.getEleventyNurseryTitle(nursery_info);

    if (
      isObject(nursery_info) &&
      objectHasOwnProperties(nursery_info, ['nursery']) &&
      objectHasOwnProperties(nursery_info, ['nursery_details']) &&
      objectHasOwnProperties(nursery_info, ['nursery_title']) &&
      isNotEmpty(nursery_info['nursery_title'])
    ) {
      nurseries.push(nursery_info);
    }

    return nurseries;
  },

  getEleventyNurseries(nursery_by_category_item_slugs, nurseries, nurseries_data) {
    if (isArrayWithItems(nursery_by_category_item_slugs)) {
      nursery_by_category_item_slugs.forEach(nursery_by_category_item_slug => {
        nurseries = module.exports.getEleventyNurseryInfoBySlug(nursery_by_category_item_slug, nurseries, nurseries_data);
      });
    }

    return nurseries;
  },

  getEleventyNurseryCategoryTitle(nursery_by_category, nursery_category_title) {
    if (isObject(nursery_by_category)) {
      if (
        objectHasOwnProperties(nursery_by_category, ['title'])
      ) {
        nursery_category_title = nursery_by_category['title'];
      }
    }

    return nursery_category_title;
  },

  getEleventyNurseryCategorySlug(nursery_by_category, nursery_category_slug) {
    if (isObject(nursery_by_category)) {
      if (
        objectHasOwnProperties(nursery_by_category, ['sourceSlug'])
      ) {
        nursery_category_slug = nursery_by_category['sourceSlug'];
      }
    }

    return nursery_category_slug;
  },

  async getEleventyNurseryCategoryDataset(data, configData) {
    let eleventyNurseryCategoryDataset =
      {
        'nursery_by_category': [],
        'has_nursery_by_category_data': false,
        'nursery_by_category_item_slugs': [],
        'nurseries': [],
        'nursery_category_title': '',
        'nursery_category_slug': '',
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

    eleventyNurseryCategoryDataset['nursery_by_category'] = module.exports.getEleventyNurseryByCategory(
      data,
      eleventyNurseryCategoryDataset['nursery_by_category']
    );

    eleventyNurseryCategoryDataset['has_nursery_by_category_data'] = module.exports.getEleventyNurseryByCategoryHasData(
      eleventyNurseryCategoryDataset['nursery_by_category'],
      eleventyNurseryCategoryDataset['has_nursery_by_category_data']
    );

    eleventyNurseryCategoryDataset['nursery_by_category_item_slugs'] = module.exports.getEleventyNurseryByCategoryItemSlugs(
      eleventyNurseryCategoryDataset['nursery_by_category'],
      eleventyNurseryCategoryDataset['has_nursery_by_category_data'],
      eleventyNurseryCategoryDataset['nursery_by_category_item_slugs']
    );

    eleventyNurseryCategoryDataset['nurseries'] = module.exports.getEleventyNurseries(
      eleventyNurseryCategoryDataset['nursery_by_category_item_slugs'],
      eleventyNurseryCategoryDataset['nurseries'],
      nurseries_data
    );

    eleventyNurseryCategoryDataset['nursery_category_title'] = module.exports.getEleventyNurseryCategoryTitle(
      eleventyNurseryCategoryDataset['nursery_by_category'],
      eleventyNurseryCategoryDataset['nursery_category_title']
    );

    eleventyNurseryCategoryDataset['nursery_category_slug'] = module.exports.getEleventyNurseryCategorySlug(
      eleventyNurseryCategoryDataset['nursery_by_category'],
      eleventyNurseryCategoryDataset['nursery_category_slug']
    );

    return eleventyNurseryCategoryDataset;
  }
}
