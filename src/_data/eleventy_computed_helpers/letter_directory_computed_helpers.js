const {
  isNotEmpty,
  getPlantTypeTitle,
  createLetterLinkList,
  isArrayWithItems,
  filterDirectoryItemsByLetter,
  createDirectoryLinkList,
  objectHasOwnProperties
} = require("../../_data/helpers.js");

const getPlantGenusLettersData = require("../plant_info/plants/data/genus_letters.js");
const getPlantGenusData = require("../plant_info/plants/data/genus.js");

module.exports = {
  getEleventyPlantsData(data, plants_data) {
    if (
      objectHasOwnProperties(data, ['plant_info_data']) &&
      objectHasOwnProperties(data['plant_info_data'], ['plants']) &&
      objectHasOwnProperties(data['plant_info_data']['plants'], ['data'])
    ) {
      plants_data = data['plant_info_data']['plants']['data'];
    }

    return plants_data;
  },

  getEleventyPlantsGenusData(plants_data, plants_genus_data) {
    if (
      objectHasOwnProperties(plants_data, ['genus'])
    ) {
      plants_genus_data = plants_data['genus'];
    }

    return plants_genus_data;
  },

  getEleventyPlantsGenusLettersData(plants_data, plants_genus_letters_data) {
    if (
      objectHasOwnProperties(plants_data, ['genus_letters'])
    ) {
      plants_genus_letters_data = plants_data['genus_letters'];
    }

    return plants_genus_letters_data;
  },

  getEleventyPlantLetterHasData(data, has_plant_letter_data) {
    if (
      objectHasOwnProperties(data, ['letter']) &&
      objectHasOwnProperties(data['letter'], ['data'])
    ) {
      has_plant_letter_data = true;
    }

    return has_plant_letter_data;
  },

  getEleventyPlantLetterData(data, has_plant_letter_data, plant_letter_data) {
    if (has_plant_letter_data) {
      plant_letter_data = data['letter']['data'];
    }

    return plant_letter_data;
  },

  getEleventyPlantLetterSlug(data, has_plant_letter_data, plant_letter_data, plant_letter_slug) {
    if (has_plant_letter_data) {
      if (objectHasOwnProperties(plant_letter_data, ['letter_slug'])) {
        plant_letter_slug = plant_letter_data['letter_slug'];
      }
    }

    return plant_letter_slug;
  },

  getEleventyPlantTypeTitle(plant_type, plant_type_title) {
    if (isNotEmpty(plant_type)) {
      plant_type_title = getPlantTypeTitle(plant_type)
    }

    return plant_type_title;
  },

  getEleventyPlantLetterLinkList(genus_letter_collection, plant_type, plant_letter_link_list) {
    if (isArrayWithItems(genus_letter_collection)) {
      plant_letter_link_list = createLetterLinkList(genus_letter_collection, plant_type);
    }

    return plant_letter_link_list;
  },

  getEleventyPlantDirectoryLinkList(genus_collection, plant_type, plant_letter_slug, plant_directory_link_list) {
    if (
      isArrayWithItems(genus_collection) &&
      isNotEmpty(plant_letter_slug)
    ) {
      const plant_items = filterDirectoryItemsByLetter(genus_collection, plant_letter_slug);

      if (
        isArrayWithItems(plant_items) &&
        isNotEmpty(plant_type)
      ) {
        plant_directory_link_list = createDirectoryLinkList(genus_collection, plant_items, plant_type);
      }
    }

    return plant_directory_link_list;
  },

  getEleventyPlantLetterDirectoryDataset(data) {
    let eleventyPlantLetterNavDataset =
      {
        has_plant_letter_data: false,
        plant_letter_data: {},
        plant_letter_slug: '',
        plant_type: 'genus',
        plant_type_title: '',
        plant_letter_link_list: [],
        plant_directory_link_list: []
      },
      plants_data = [],
      plants_genus_data = [],
      plants_genus_letters_data = []
    ;

    plants_data = module.exports.getEleventyPlantsData(
      data,
      plants_data
    );

    plants_genus_data = module.exports.getEleventyPlantsGenusData(
      plants_data,
      plants_genus_data
    );

    plants_genus_letters_data = module.exports.getEleventyPlantsGenusLettersData(
      plants_data,
      plants_genus_letters_data
    );

    eleventyPlantLetterNavDataset['has_plant_letter_data'] = module.exports.getEleventyPlantLetterHasData(
      data,
      eleventyPlantLetterNavDataset['has_plant_letter_data']
    );

    eleventyPlantLetterNavDataset['plant_letter_data'] = module.exports.getEleventyPlantLetterData(
      data,
      eleventyPlantLetterNavDataset['has_plant_letter_data'],
      eleventyPlantLetterNavDataset['plant_letter_data']
    );

    eleventyPlantLetterNavDataset['plant_letter_slug'] = module.exports.getEleventyPlantLetterSlug(
      data,
      eleventyPlantLetterNavDataset['has_plant_letter_data'],
      eleventyPlantLetterNavDataset['plant_letter_data'],
      eleventyPlantLetterNavDataset['plant_letter_slug']
    );

    eleventyPlantLetterNavDataset['plant_type_title'] = module.exports.getEleventyPlantTypeTitle(
      eleventyPlantLetterNavDataset['plant_type'],
      eleventyPlantLetterNavDataset['plant_type_title'],
    );

    eleventyPlantLetterNavDataset['plant_letter_link_list'] = module.exports.getEleventyPlantLetterLinkList(
      plants_genus_letters_data,
      eleventyPlantLetterNavDataset['plant_type'],
      eleventyPlantLetterNavDataset['plant_letter_link_list']
    );

    eleventyPlantLetterNavDataset['plant_directory_link_list'] = module.exports.getEleventyPlantDirectoryLinkList(
      plants_genus_data,
      eleventyPlantLetterNavDataset['plant_type'],
      eleventyPlantLetterNavDataset['plant_letter_slug'],
      eleventyPlantLetterNavDataset['plant_directory_link_list']
    );

    return eleventyPlantLetterNavDataset;
  }
}
