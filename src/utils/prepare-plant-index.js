const showPerformanceTimingCheck = require('./show-performance-timing-check.js');

const {
  objectHasOwnProperties,
  isArrayWithItems,
  createPlantPermalinkPath,
  createCommonNamePermalinkPath,
  capitalizeFirstLetter,
  mergeObjects,
} = require('../_data/helpers.js');

/**
 * Takes a collection and returns it back with the custom index.
 *
 * @param {Array|Object}    plantLevels       An array of 11ty collections
 * @param {Array|Object}    commonNames       The 11ty collection
 * @param {Array|Object}    nurseryCatalogs   The 11ty collection
 * @param {Array|Object}    journalCitations  The 11ty collection
 * @returns {Array}                           The custom index
 */
module.exports = (plantLevels, commonNames, nurseryCatalogs, journalCitations) => {
  let index = [],
    indexKeyChecker = {},
    plantsInNurseryCatalogs = [],
    plantsInJournalCitations = [],
    index_default_settings = {
      machine_name: null,
      permalink_path: null,
      name: null,
      has_plant: false,
      plant_name: null,
      plant_machine_name: null,
      plant_permalink_path: null,
      has_taxonomy_level: false,
      taxonomy_level_key: null,
      taxonomy_level_name: null,
      has_common_name: false,
      common_name:  null,
      common_machine_name: null,
      common_name_has_permalink: false,
      common_name_permalink_path: null,
      available_in_nursery: false,
      has_citations: false
    },

  addItemToIndexKeyChecker = function(indexItem, itemIndex, indexKeyChecker) {
    if (
      objectHasOwnProperties(indexItem, ['machine_name']) &&
      indexItem['machine_name'] !== '' &&
      itemIndex !== null
    ) {
      let
        indexItemKey = indexItem['machine_name'],
        itemIndexCheck = {
          machine_name: indexItem['machine_name'],
          itemIndex: itemIndex
        },
        indexItemKeyCheck = {};

      indexItemKeyCheck[indexItemKey] = itemIndexCheck;

      if (objectHasOwnProperties(indexKeyChecker, indexItemKey)) {
        indexKeyChecker[indexItemKey] = itemIndexCheck;
      } else {
        indexKeyChecker.push(indexItemKeyCheck);
      }

    }

    return indexKeyChecker;
  },

  addItemToIndex = function(index_settings = index_default_settings, index) {
    let merged_index_settings = mergeObjects(index_default_settings, index_settings);
    index.push(merged_index_settings);

    return index;
  },

  addNurseryCatalogPlant = function(plant) {
    if (
      objectHasOwnProperties(plant, ['machine_name']) &&
      plantsInNurseryCatalogs.includes(plant['machine_name']) === false
    ) {
      plantsInNurseryCatalogs.push(plant['machine_name']);
    }
  },

  addJournalCitationPlant = function(plant) {
    if (
      objectHasOwnProperties(plant, ['machine_name']) &&
      plantsInJournalCitations.includes(plant['machine_name']) === false
    ) {
      plantsInJournalCitations.push(plant['machine_name']);
    }
  },

  getItemIndexForMerge = function(indexKeyChecker, mergeKey, itemKey) {
    if (
      objectHasOwnProperties(indexKeyChecker, itemKey) &&
      objectHasOwnProperties(indexKeyChecker, ['itemIndex']) &&
      indexKeyChecker[mergeKey] === itemKey &&
      indexKeyChecker['itemIndex'] !== null
    ) {
      return indexKeyChecker['itemIndex']
    }
    // for (let item_index = 0; item_index < index.length; item_index++ ) {
    //   if (index[item_index][mergeKey] === itemKey) {
    //     // Return item index.
    //     return item_index;
    //   }
    // }

    // Item index not found.
    return -1;
    // return index.findIndex(item => item[mergeKey] === itemKey);
  },

  addItemForMergeToIndex = function(itemsForMerge, index, indexKeyChecker, itemKey, mergeKey) {
    let itemToMerge = {
      item: {},
      index: null,
    };

    // const tncmii0 = performance.now();
    itemToMerge.index = getItemIndexForMerge(indexKeyChecker, mergeKey, itemKey);
    // const tncmii1 = performance.now();
    // if (indexProp === 'available_in_nursery') {
    //   showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (nursery_catalog: mergeItemsToIndexProp:findIndex)', tncmii0, tncmii1);
    // }

    if (itemToMerge.index !== -1) {
      itemToMerge.itemToMerge = index[itemToMerge.index];
      itemsForMerge.push(itemToMerge);

      // const tncmio0 = performance.now();
      // const tncmio1 = performance.now();
      // if (indexProp === 'available_in_nursery') {
      //   showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (nursery_catalog: mergeItemsToIndexProp:mergeObjects)', tncmio0, tncmio1);
      // }
    }

    return itemsForMerge;
  },

  mergeItemToIndex = function(itemForMerge, index, mergeSettings) {
    index[itemForMerge.index] = mergeObjects(itemForMerge.item, mergeSettings);

    return index;
  },

  mergeItemsToIndexProp = function(itemsArray, index, indexProp, indexKeyChecker) {
    const
      mergeKey = 'machine_name',
      mergeSettings = {};

    let itemsForMerge = [];
    mergeSettings[indexProp] = true;

    itemsArray.forEach(itemKey => {
      itemsForMerge = addItemForMergeToIndex(itemsForMerge, index, indexKeyChecker, mergeKey, itemKey);
    });

    itemsForMerge.forEach(itemForMerge => {
      index = mergeItemToIndex(itemForMerge, index, mergeSettings);
    });

    return index;
  },

  mergeCommonNameWithIndex = function(index_settings = index_default_settings, index) {
    let
      merged_index_settings = mergeObjects(index_default_settings, index_settings),
      mergeKey = 'machine_name',
      merge_with_index = false,
      merged_item_index = null,
      item_for_merge = {},
      merged_item = {};

    if (
      objectHasOwnProperties(index_settings, ['machine_name']) &&
      objectHasOwnProperties(index_settings, ['has_plant']) &&
      objectHasOwnProperties(index_settings, ['has_common_name']) &&
      index_settings['has_plant'] === true &&
      index_settings['has_common_name'] === true
    ) {
      let itemKey = index_settings['machine_name'];

      merged_item_index = getItemIndexForMerge(index, mergeKey, itemKey);

      if (merged_item_index !== -1) {
        item_for_merge = index[merged_item_index];
        merged_item = mergeObjects(item_for_merge, index_settings);
        merge_with_index = true;
      }
    }

    if (
      merge_with_index === true &&
      merged_item_index !== null &&
      merged_item !== {}
    ) {
      index[merged_item_index] = merged_item;
    } else {
      index.push(merged_index_settings);
    }

    return index;
  },

  addPlantToIndex = function(plantInLevel, index) {
    if (
      objectHasOwnProperties(plantInLevel, ['data'])
    ) {

      if (
        objectHasOwnProperties(plantInLevel.data, ['name']) &&
        objectHasOwnProperties(plantInLevel.data, ['machine_name']) &&
        objectHasOwnProperties(plantInLevel.data, ['type'])
      ) {
        let
          plant_name = plantInLevel.data['name'],
          plant_machine_name = plantInLevel.data['machine_name'],
          plant_permalink_path = createPlantPermalinkPath(plantInLevel),
          has_taxonomy_level = true,
          taxonomy_level_key,
          taxonomy_level_name;

        if (
          objectHasOwnProperties(plantInLevel.data, ['lower_ranks']) &&
          isArrayWithItems(plantInLevel.data['lower_ranks'])
        ) {
          taxonomy_level_key = plantInLevel.data['lower_ranks'][0];
          taxonomy_level_name = plantInLevel.data['lower_ranks'][0];
        } else {
          taxonomy_level_key = plantInLevel.data['type'];
          taxonomy_level_name = capitalizeFirstLetter(plantInLevel.data['type']);
        }

        let this_plant_index_settings = {
          machine_name: plant_machine_name,
          permalink_path: plant_permalink_path,
          name: plant_name,
          has_plant: true,
          plant_name: plant_name,
          plant_machine_name: plant_machine_name,
          plant_permalink_path: plant_permalink_path,
          has_taxonomy_level: has_taxonomy_level,
          taxonomy_level_key: taxonomy_level_key,
          taxonomy_level_name: taxonomy_level_name,
        };

        index = addItemToIndex(this_plant_index_settings, index);
      }
    }

    return index;
  },

  addPlantLevelToIndex = function(plantLevel, index) {
    if (
      isArrayWithItems(plantLevel) &&
      Array.isArray(index)
    ) {
      return plantLevel.reduce((index, plantInLevel) => {
        return addPlantToIndex(plantInLevel, index);
      }, index);
    } else {
      return index;
    }
  },

  addCommonNameToIndex = function(commonName, index) {
    if (
      objectHasOwnProperties(commonName, ['data'])
    ) {
      if (
        objectHasOwnProperties(commonName.data, ['name']) &&
        objectHasOwnProperties(commonName.data, ['machine_name']) &&
        objectHasOwnProperties(commonName.data, ['type']) &&
        commonName.data['type'] === 'common_name'
      ) {
        let
          common_name = commonName.data['name'],
          common_machine_name = commonName.data['machine_name'],
          common_name_permalink_path = createCommonNamePermalinkPath(commonName),
          default_plant_index_settings = {
            has_common_name: true,
            common_name: common_name,
            common_machine_name: common_machine_name,
          },
          override_plant_index_settings = {},
          this_plant_index_settings = {};

        if (
          objectHasOwnProperties(commonName.data, ['plants']) &&
          isArrayWithItems(commonName.data['plants']) &&
          objectHasOwnProperties(commonName.data['plants'][0], ['machine_name'])
        ) {
          override_plant_index_settings = {
            has_plant: true,
            machine_name: commonName.data['plants'][0]['machine_name'],
            common_name_has_permalink: true,
            common_name_permalink_path: common_name_permalink_path
          };
        } else {
          override_plant_index_settings = {
            has_plant: false,
            name: common_name,
            machine_name: common_machine_name,
            permalink_path: null,
            common_name_has_permalink: false,
            common_name_permalink_path: null
          };
        }

        this_plant_index_settings = mergeObjects(default_plant_index_settings, override_plant_index_settings);
        index = mergeCommonNameWithIndex(this_plant_index_settings, index);
      }
    }

    return index;
  },

  reviewNurseryCatalog = function(nurseryCatalog) {
    if (
      objectHasOwnProperties(nurseryCatalog, ['data']) &&
      objectHasOwnProperties(nurseryCatalog.data, ['plants']) &&
      isArrayWithItems(nurseryCatalog.data['plants'])
    ) {
      nurseryCatalog.data['plants'].forEach(plant => {
        addNurseryCatalogPlant(plant);
      });
    }
  },

  reviewJournalCitation = function(journalCitation) {
    if (
      objectHasOwnProperties(journalCitation, ['data']) &&
      objectHasOwnProperties(journalCitation.data, ['plant'])
    ) {
      addJournalCitationPlant(journalCitation.data['plant']);
    }
  },

  addPlantLevelsToIndex = function(plantLevels, index) {
    if (
      isArrayWithItems(plantLevels) &&
      Array.isArray(index)
    ) {
      console.log(plantLevels.length + ' plant levels to add to index');
      return plantLevels.reduce((index, plantLevel) => {
        return addPlantLevelToIndex(plantLevel, index);
      }, index);
    } else {
      return index;
    }
  },

  createIndexKeyChecker = function(index, indexKeyChecker) {
    if (
      isArrayWithItems(index)
    ) {
      console.log(index.length + ' index items to add to index key checker');
      index.forEach((indexItem, itemIndex) => {
        indexKeyChecker = addItemToIndexKeyChecker(indexItem, itemIndex, indexKeyChecker);
      });
    }

    return indexKeyChecker;
  },

  addCommonNamesToIndex = function(commonNames, index, indexKeyChecker) {
    if (
      isArrayWithItems(commonNames) &&
      isArrayWithItems(indexKeyChecker) &&
      Array.isArray(index)
    ) {
      console.log(commonNames.length + ' common names to add to index');
      return commonNames.reduce((index, commonName) => {
        return addCommonNameToIndex(commonName, index);
      }, index);
    } else {
      return index;
    }
  },

  reviewNurseryCatalogs = function(nurseryCatalogs, index, indexKeyChecker) {
    if (
      isArrayWithItems(nurseryCatalogs) &&
      isArrayWithItems(indexKeyChecker) &&
      Array.isArray(index)
    ) {
      // console.log(nurseryCatalogs.length + ' nursery catalogs to add to index');
      // const tncfe0 = performance.now();
      nurseryCatalogs.forEach(nurseryCatalog => {
        reviewNurseryCatalog(nurseryCatalog);
      });
      // const tncfe1 = performance.now();
      // showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (reviewNurseryCatalogs:forEach)', tncfe0, tncfe1);

    }

    // const tncmi0 = performance.now();
    index = mergeItemsToIndexProp(plantsInNurseryCatalogs, index, 'available_in_nursery', indexKeyChecker);
    // const tncmi1 = performance.now();
    // showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (reviewNurseryCatalogs:mergeItems)', tncmi0, tncmi1);

    return index;
  },

  reviewJournalCitations = function(journalCitations, index, indexKeyChecker) {
    if (
      isArrayWithItems(journalCitations) &&
      isArrayWithItems(indexKeyChecker) &&
      Array.isArray(index)
    ) {
      // console.log(journalCitations.length + ' journal citations to add to index');
      // const tjcfe0 = performance.now();
      journalCitations.forEach(journalCitation => {
        reviewJournalCitation(journalCitation);
      });
      // const tjcfe1 = performance.now();
      // showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (reviewJournalCitations:forEach)', tjcfe0, tjcfe1);
    }

    // const tjcmi0 = performance.now();
    index = mergeItemsToIndexProp(plantsInJournalCitations, index, 'has_citations', indexKeyChecker);
    // const tjcmi1 = performance.now();
    // showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (reviewJournalCitations:mergeItems)', tjcmi0, tjcmi1);

    return index;
  }

  // const tpl0 = performance.now();
  index = addPlantLevelsToIndex(plantLevels, index);
  // const tpl1 = performance.now();
  // showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (addPlantLevelsToIndex)', tpl0, tpl1);

  // const tcik0 = performance.now();
  indexKeyChecker = createIndexKeyChecker(index, indexKeyChecker);
  // const tcik1 = performance.now();
  // showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (createIndexKeyChecker)', tcik0, tcik1);

  // const tcn0 = performance.now();
  index = addCommonNamesToIndex(commonNames, index, indexKeyChecker);
  // const tcn1 = performance.now();
  // showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (addCommonNamesToIndex)', tcn0, tcn1);

  // const tnc0 = performance.now();
  index = reviewNurseryCatalogs(nurseryCatalogs, index, indexKeyChecker);
  // const tnc1 = performance.now();
  // showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (reviewNurseryCatalogs)', tnc0, tnc1);

  // const trj0 = performance.now();
  index = reviewJournalCitations(journalCitations, index, indexKeyChecker);
  // const trj1 = performance.now();
  // showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (reviewJournalCitations)', trj0, trj1);

  return index;
};
