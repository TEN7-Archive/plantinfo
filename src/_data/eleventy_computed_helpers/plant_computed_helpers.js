const getPlantInfoData = require("../plant_info_data.js");

const {
  isArrayWithItems,
  isNotEmpty,
  isObject,
  objectHasOwnProperties,
  getScientificNameInfo,
  getChildPlantType,
  getPlantTypeTitle,
  getChildPlantsByTypeAndMachineName,
  createChildLinkList,
  getPlantByTypeAndMachineName,
  createPlantPermalinkPath,
  getCollectionPathData,
  getPlantCitations
} = require("../helpers.js");

module.exports = {
  async getEleventyPlantInfoData(configData, plant_info_data) {
    if (
      isObject(configData)
    ) {
      plant_info_data = await getPlantInfoData(configData);
    }

    return plant_info_data;
  },

  async getEleventyPlantsData(plant_info_data, plants_data) {
    if (isObject(plant_info_data)) {
      plants_data = getCollectionPathData(plant_info_data, ['plants', 'data']);
    }

    return plants_data;
  },

  async getEleventyCitationsData(plant_info_data, citations_data) {
    if (isObject(plant_info_data)) {
      citations_data = getCollectionPathData(plant_info_data, ['citations', 'data']);
    }

    return citations_data;
  },

  getEleventyPlantHasData(data, has_plant_data) {
    if (isObject(data)) {
      if (
        objectHasOwnProperties(data, ['plant']) &&
        objectHasOwnProperties(data['plant'], ['data'])
      ) {
        has_plant_data = true;
      }
    }

    return has_plant_data;
  },

  getEleventyPlantData(data, has_plant_data, plant_data) {
    if (has_plant_data) {
      plant_data = data['plant']['data'];
    }

    return plant_data;
  },

  getEleventyPlantName(data, has_plant_data, plant_data, plant_name) {
    if (has_plant_data) {
      if (objectHasOwnProperties(plant_data, ['name'])) {
        plant_name = plant_data['name'];
      }
    }

    return plant_name;
  },

  getEleventyPlantMachineName(data, has_plant_data, plant_data, plant_machine_name) {
    if (has_plant_data) {
      if (objectHasOwnProperties(plant_data, ['machine_name'])) {
        plant_machine_name = plant_data['machine_name'];
      }
    }

    return plant_machine_name;
  },

  getEleventyPlantType(data, has_plant_data, plant_data, plant_type) {
    if (has_plant_data) {
      if (objectHasOwnProperties(plant_data, ['type'])) {
        plant_type = plant_data['type'];
      }
    }

    return plant_type;
  },

  getEleventyPlantScientificNameInfo(data, has_plant_data, plant_data, plants_data, plant_type, scientificNameInfo) {
    if (
      (has_plant_data) &&
      (plant_type !== '') &&
      isObject(plants_data)
    ) {
      scientificNameInfo = getScientificNameInfo(plants_data, plant_data, plant_type);
    }

    return scientificNameInfo;
  },

  getEleventyChildPlantType(plant_type, child_plant_type) {
    if (isNotEmpty(plant_type)) {
      child_plant_type = getChildPlantType(plant_type);
    }

    return child_plant_type;
  },

  getEleventyChildPlantTypeTitle(child_plant_type, child_plant_type_title) {
    if (isNotEmpty(child_plant_type)) {
      child_plant_type_title = getPlantTypeTitle(child_plant_type);
    }

    return child_plant_type_title;
  },

  getEleventyChildPlantCollection(plants_data, child_plant_type, child_plant_collection) {
    if (
      isObject(plants_data) &&
      isNotEmpty(child_plant_type)
    ) {
      child_plant_collection = plants_data[child_plant_type];
    }

    return child_plant_collection;
  },

  getEleventyChildPlantItems(child_collection, child_plant_type, plant_type, plant_machine_name, child_plant_items) {
    if (
      isArrayWithItems(child_collection) &&
      isNotEmpty(child_plant_type) &&
      isNotEmpty(plant_type) &&
      isNotEmpty(plant_machine_name)
    ) {
      child_plant_items = getChildPlantsByTypeAndMachineName(child_collection, child_plant_type, plant_type, plant_machine_name);
    }

    return child_plant_items;
  },

  getEleventyChildLinkList(plants_data, child_plant_items, child_plant_type, child_plant_link_list) {
    if (
      isObject(plants_data) &&
      isArrayWithItems(child_plant_items) &&
      isNotEmpty(child_plant_type)
    ) {
      child_plant_link_list = createChildLinkList(plants_data, child_plant_items, child_plant_type);
    }

    return child_plant_link_list;
  },

  getTaxonomyLevelMachineName(taxonomy_level, scientificNameInfo) {
    let taxonomy_level_machine_name = '';


    if (
      objectHasOwnProperties(taxonomy_level, ['level_type']) &&
      isNotEmpty(taxonomy_level['level_type']) &&
      objectHasOwnProperties(scientificNameInfo, [taxonomy_level['level_type']]) &&
      objectHasOwnProperties(scientificNameInfo[taxonomy_level['level_type']], ['machine_name']) &&
      isNotEmpty(scientificNameInfo[taxonomy_level['level_type']]['machine_name'])
    ) {
      taxonomy_level_machine_name =  scientificNameInfo[taxonomy_level['level_type']]['machine_name'];
    }

    return taxonomy_level_machine_name;
  },

  getTaxonomyLevelPlant(taxonomy_level, plants_data) {
    let taxonomy_level_plant = {};

    if (
      isObject(plants_data) &&
      objectHasOwnProperties(taxonomy_level, ['level_type']) &&
      objectHasOwnProperties(taxonomy_level, ['level_machine_name']) &&
      isNotEmpty(taxonomy_level['level_type']) &&
      isNotEmpty(taxonomy_level['level_machine_name'])
    ) {
      taxonomy_level_plant =  getPlantByTypeAndMachineName(plants_data, taxonomy_level['level_type'], taxonomy_level['level_machine_name'], '');
    }

    return taxonomy_level_plant;
  },

  getTaxonomyLevelName(taxonomy_level) {
    let taxonomy_level_name = '';

    if (
      objectHasOwnProperties(taxonomy_level, ['level_plant']) &&
      objectHasOwnProperties(taxonomy_level['level_plant'], ['data']) &&
      objectHasOwnProperties(taxonomy_level['level_plant']['data'], ['name']) &&
      isNotEmpty(taxonomy_level['level_plant']['data']['name'])
    ) {
      taxonomy_level_name =  taxonomy_level['level_plant']['data']['name'];
    }

    return taxonomy_level_name;
  },

  getTaxonomyLevelPermalinkPath(taxonomy_level) {
    let taxonomy_level_permalink_path = '';

    if (
      objectHasOwnProperties(taxonomy_level, ['level_plant']) &&
      isObject(taxonomy_level['level_plant'])
    ) {
      taxonomy_level_permalink_path =  createPlantPermalinkPath(taxonomy_level['level_plant']);
    }

    return taxonomy_level_permalink_path;
  },

  getEleventyPlantTaxonomyLevel(taxonomy_level, scientificNameInfo, plants_data) {
    let plant_taxonomy_level = {
      'level_machine_name': '',
      'level_plant': {},
      'level_name': '',
      'level_permalink_path': ''
    }

    if (
      objectHasOwnProperties(taxonomy_level, ['level_type'])
    ) {
      plant_taxonomy_level['level_type'] = taxonomy_level['level_type'];
    }

    if (
      objectHasOwnProperties(taxonomy_level, ['level_machine_name'])
    ) {
      plant_taxonomy_level['level_machine_name'] = taxonomy_level['level_machine_name'];
      plant_taxonomy_level['level_machine_name'] =  module.exports.getTaxonomyLevelMachineName(plant_taxonomy_level, scientificNameInfo);
    }

    if (
      objectHasOwnProperties(taxonomy_level, ['level_plant'])
    ) {
      plant_taxonomy_level['level_plant'] = taxonomy_level['level_plant'];
      plant_taxonomy_level['level_plant'] =  module.exports.getTaxonomyLevelPlant(plant_taxonomy_level, plants_data);
    }

    if (
      objectHasOwnProperties(taxonomy_level, ['level_name'])
    ) {
      plant_taxonomy_level['level_name'] = taxonomy_level['level_name'];
      plant_taxonomy_level['level_name'] =  module.exports.getTaxonomyLevelName(plant_taxonomy_level);
    }

    if (
      objectHasOwnProperties(taxonomy_level, ['level_permalink_path'])
    ) {
      plant_taxonomy_level['level_permalink_path'] = taxonomy_level['level_permalink_path'];
      plant_taxonomy_level['level_permalink_path'] =  module.exports.getTaxonomyLevelPermalinkPath(plant_taxonomy_level);
    }

    return plant_taxonomy_level;
  },

  getEleventyPlantTaxonomyLevels(plant_type, scientificNameInfo, plants_data, taxonomy_levels) {
    let plant_taxonomy_levels = [];

    if (
      (plant_type === 'species') ||
      (plant_type === 'variety')
    ) {
      if (
        isObject(scientificNameInfo) &&
        isObject(plants_data) &&
        isArrayWithItems(taxonomy_levels)
      ) {
        taxonomy_levels.forEach(taxonomy_level => {
          let plant_taxonomy_level = module.exports.getEleventyPlantTaxonomyLevel(taxonomy_level, scientificNameInfo, plants_data);

          plant_taxonomy_levels.push(plant_taxonomy_level);
        });
      }
    }

    return plant_taxonomy_levels;
  },

  getEleventyPlantCitationItems(plant_type, plant_data, citations_data, plant_citation_items) {
    if (
      isNotEmpty(plant_type) &&
      isObject(citations_data)
    ) {
      const citations_collection = citations_data['citation_reference'];

      if (isArrayWithItems(citations_collection)) {
        plant_citation_items = getPlantCitations(citations_collection, plant_data);
      }
    }

    return plant_citation_items;
  },

  async getEleventyPlantDataset(data, configData) {
    let eleventyPlantDataset =
      {
        has_plant_data: false,
        plant_data: {},
        plant_name: '',
        plant_machine_name: '',
        plant_type: '',
        scientificNameInfo: {},
        child_plant_type: '',
        child_plant_type_title: '',
        child_plant_link_list: [],
        taxonomy_levels: [
          {
            level_type: 'genus',
            level_machine_name: '',
            level_plant: {},
            level_name: '',
            level_permalink_path: ''
          },
          {
            level_type: 'species',
            level_machine_name: '',
            level_plant: {},
            level_name: '',
            level_permalink_path: ''
          },
          {
            level_type: 'variety',
            level_machine_name: '',
            level_plant: {},
            level_name: '',
            level_permalink_path: ''
          },
        ],
        plant_citation_items: []
      },
    plant_info_data = [],
    plants_data = [],
    citations_data = [],
    child_plant_collection = [],
    child_plant_items = [];

    plant_info_data = await module.exports.getEleventyPlantInfoData(
      configData,
      plant_info_data
    );

    plants_data = await module.exports.getEleventyPlantsData(
      plant_info_data,
      plants_data
    );

    citations_data = await module.exports.getEleventyCitationsData(
      plant_info_data,
      citations_data
    );

    eleventyPlantDataset['has_plant_data'] = module.exports.getEleventyPlantHasData(
      data,
      eleventyPlantDataset['has_plant_data']
    );

    eleventyPlantDataset['plant_data'] = module.exports.getEleventyPlantData(
      data,
      eleventyPlantDataset['has_plant_data'],
      eleventyPlantDataset['plant_data']
    );

    eleventyPlantDataset['plant_name'] = module.exports.getEleventyPlantName(
      data,
      eleventyPlantDataset['has_plant_data'],
      eleventyPlantDataset['plant_data'],
      eleventyPlantDataset['plant_name']
    );

    eleventyPlantDataset['plant_machine_name'] = module.exports.getEleventyPlantMachineName(
      data,
      eleventyPlantDataset['has_plant_data'],
      eleventyPlantDataset['plant_data'],
      eleventyPlantDataset['plant_machine_name']
    );

    eleventyPlantDataset['plant_type'] = module.exports.getEleventyPlantType(
      data,
      eleventyPlantDataset['has_plant_data'],
      eleventyPlantDataset['plant_data'],
      eleventyPlantDataset['plant_type']
    );

    eleventyPlantDataset['scientificNameInfo'] = module.exports.getEleventyPlantScientificNameInfo(
      data,
      eleventyPlantDataset['has_plant_data'],
      eleventyPlantDataset['plant_data'],
      plants_data,
      eleventyPlantDataset['plant_type'],
      eleventyPlantDataset['scientificNameInfo']
    );

    eleventyPlantDataset['child_plant_type'] = module.exports.getEleventyChildPlantType(
      eleventyPlantDataset['plant_type'],
      eleventyPlantDataset['child_plant_type']
    );

    eleventyPlantDataset['child_plant_type_title'] = module.exports.getEleventyChildPlantTypeTitle(
      eleventyPlantDataset['child_plant_type'],
      eleventyPlantDataset['child_plant_type_title']
    );

    child_plant_collection = module.exports.getEleventyChildPlantCollection(
      plants_data,
      eleventyPlantDataset['child_plant_type'],
      child_plant_collection
    );

    child_plant_items = module.exports.getEleventyChildPlantItems(
      child_plant_collection,
      eleventyPlantDataset['child_plant_type'],
      eleventyPlantDataset['plant_type'],
      eleventyPlantDataset['plant_machine_name'],
      child_plant_items
    );

    eleventyPlantDataset['child_plant_link_list']  = module.exports.getEleventyChildLinkList(
      plants_data,
      child_plant_items,
      eleventyPlantDataset['child_plant_type'],
      eleventyPlantDataset['child_plant_link_list']
    );

    eleventyPlantDataset['taxonomy_levels']  = module.exports.getEleventyPlantTaxonomyLevels(
      eleventyPlantDataset['plant_type'],
      eleventyPlantDataset['scientificNameInfo'],
      plants_data,
      eleventyPlantDataset['taxonomy_levels']
    );

    eleventyPlantDataset['plant_citation_items']  = module.exports.getEleventyPlantCitationItems(
      eleventyPlantDataset['plant_type'],
      eleventyPlantDataset['plant_data'],
      plants_data,
      eleventyPlantDataset['plant_citation_items']
    );

    return eleventyPlantDataset;
  }
}
