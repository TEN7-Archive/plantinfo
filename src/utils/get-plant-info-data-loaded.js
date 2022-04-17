const {
  isObject,
  getCollectionPathData,
} = require("../_data/helpers.js");

/**
 * Check if the plant info data has loaded.
 *
 * @param {Object}  plantInfoData   The plantInfoData.
 * @param {Object}  configData      The configData to use in the processing.
 * @returns {Object}                The processed plantInfoData
 */
module.exports = (plantInfoData, configData) => {
  let
    citationsJournalBookData = {},
    citationsCitationReferenceData = {},

    nurseriesNurseryData = {},
    nurseriesCategoryData = {},
    nurseriesSpecialtyData = {},
    nurseriesByCategoryData = {},
    nurseriesCatalogData = {},

    plantsFamilyData = {},
    plantsGenusData = {},
    plantsSpeciesData = {},
    plantsVarietyData = {},
    plantsCommonNameData = {},
    plantsCommonNameLettersData = {},
    plantsGenusLettersData = {},

    nurseriesPrepareNurseryIndexData = {},
    nurseriesBuildNurseryIndexData = {},

    plantsPreparePlantIndexData = {},
    plantsBuildPlantIndexData = {},

    citationsJournalBookCount = {},
    citationsCitationReferenceCount = {},

    nurseriesNurseryCount = {},
    nurseriesCategoryCount = {},
    nurseriesSpecialtyCount = {},
    nurseriesByCategoryCount = {},
    nurseriesCatalogCount = {},

    plantsFamilyCount = {},
    plantsGenusCount = {},
    plantsSpeciesCount = {},
    plantsVarietyCount= {},
    plantsCommonNameCount = {},
    plantsCommonNameLettersCount = {},
    plantsGenusLettersCount = {},

    nurseriesPrepareNurseryIndexCount = {},
    nurseriesBuildNurseryIndexCount = {},

    plantsPreparePlantIndexCount = {},
    plantsBuildPlantIndexCount = {},

    plantInfoDataLoaded = false
  ;

  if (isObject(plantInfoData)) {
    let citationsData = getCollectionPathData(plantInfoData, ['citations', 'data']);
    let nurseriesData = getCollectionPathData(plantInfoData, ['nurseries', 'data']);
    let plantsData = getCollectionPathData(plantInfoData, ['plants', 'data']);

    citationsJournalBookData = getCollectionPathData(citationsData, ['journal_book']);
    citationsCitationReferenceData = getCollectionPathData(citationsData, ['citation_reference']);

    nurseriesNurseryData = getCollectionPathData(nurseriesData, ['nursery']);
    nurseriesCategoryData = getCollectionPathData(nurseriesData, ['nursery_category']);
    nurseriesSpecialtyData = getCollectionPathData(nurseriesData, ['nursery_specialty']);
    nurseriesByCategoryData = getCollectionPathData(nurseriesData, ['nursery_by_category']);
    nurseriesCatalogData = getCollectionPathData(nurseriesData, ['nursery_catalog']);

    plantsFamilyData = getCollectionPathData(plantsData, ['family']);
    plantsGenusData = getCollectionPathData(plantsData, ['genus']);
    plantsSpeciesData = getCollectionPathData(plantsData, ['species']);
    plantsVarietyData = getCollectionPathData(plantsData, ['variety']);
    plantsCommonNameData = getCollectionPathData(plantsData, ['common_name']);
    plantsCommonNameLettersData = getCollectionPathData(plantsData, ['common_name_letters']);
    plantsGenusLettersData = getCollectionPathData(plantsData, ['genus_letters']);

    nurseriesPrepareNurseryIndexData = getCollectionPathData(nurseriesData, ['prepare_nursery_index']);
    nurseriesBuildNurseryIndexData = getCollectionPathData(nurseriesData, ['build_nursery_index']);

    plantsPreparePlantIndexData = getCollectionPathData(plantsData, ['prepare_plant_index']);
    plantsBuildPlantIndexData = getCollectionPathData(plantsData, ['build_plant_index']);

    citationsJournalBookCount = Object.entries(citationsJournalBookData).length;
    citationsCitationReferenceCount = Object.entries(citationsCitationReferenceData).length;

    nurseriesNurseryCount = Object.entries(nurseriesNurseryData).length;
    nurseriesCategoryCount = Object.entries(nurseriesCategoryData).length;
    nurseriesSpecialtyCount = Object.entries(nurseriesSpecialtyData).length;
    nurseriesByCategoryCount = Object.entries(nurseriesByCategoryData).length;
    nurseriesCatalogCount = Object.entries(nurseriesCatalogData).length;

    plantsFamilyCount = Object.entries(plantsFamilyData).length;
    plantsGenusCount = Object.entries(plantsGenusData).length;
    plantsSpeciesCount = Object.entries(plantsSpeciesData).length;
    plantsVarietyCount = Object.entries(plantsVarietyData).length;
    plantsCommonNameCount = Object.entries(plantsCommonNameData).length;
    plantsCommonNameLettersCount = Object.entries(plantsCommonNameLettersData).length;
    plantsGenusLettersCount = Object.entries(plantsGenusLettersData).length;

    nurseriesPrepareNurseryIndexCount = Object.entries(nurseriesPrepareNurseryIndexData).length;
    nurseriesBuildNurseryIndexCount = Object.entries(nurseriesBuildNurseryIndexData).length;

    plantsPreparePlantIndexCount = Object.entries(plantsPreparePlantIndexData).length;
    plantsBuildPlantIndexCount = Object.entries(plantsBuildPlantIndexData).length;

    console.log('journal book data has ' + citationsJournalBookCount + ' items');
    console.log('citation reference data has ' + citationsCitationReferenceCount + ' items');

    console.log('nursery data has ' + nurseriesNurseryCount + ' items');
    console.log('nursery category data has ' + nurseriesCategoryCount + ' items');
    console.log('nursery specialty data has ' + nurseriesSpecialtyCount + ' items');
    console.log('nursery by category data has ' + nurseriesByCategoryCount + ' items');
    console.log('nursery catalog data has ' + nurseriesCatalogCount + ' items');

    console.log('plant family data has ' + plantsFamilyCount + ' items');
    console.log('plant genus data has ' + plantsGenusCount + ' items');
    console.log('plant species data has ' + plantsSpeciesCount + ' items');
    console.log('plant variety data has ' + plantsVarietyCount + ' items');
    console.log('common name data has ' + plantsCommonNameCount + ' items');
    console.log('common name letters data has ' + plantsCommonNameLettersCount + ' items');
    console.log('genus letters data has ' + plantsGenusLettersCount + ' items');

    console.log('nursery prepare index data has ' + nurseriesPrepareNurseryIndexCount + ' items');
    console.log('nursery build index data has ' + nurseriesBuildNurseryIndexCount + ' items');

    console.log('plants prepare index data has ' + plantsPreparePlantIndexCount + ' items');
    console.log('plants build index data has ' + plantsBuildPlantIndexCount + ' items');

    if (
      (citationsJournalBookCount > 0) &&
      (citationsCitationReferenceCount > 0) &&

      (nurseriesNurseryCount > 0) &&
      (nurseriesCategoryCount > 0) &&
      (nurseriesSpecialtyCount > 0) &&
      (nurseriesByCategoryCount > 0) &&
      (nurseriesCatalogCount > 0) &&

      (plantsFamilyCount > 0) &&
      (plantsGenusCount > 0) &&
      (plantsSpeciesCount > 0) &&
      (plantsVarietyCount > 0) &&
      (plantsCommonNameCount > 0) &&
      (plantsCommonNameLettersCount > 0) &&
      (plantsGenusLettersCount > 0) &&

      (nurseriesPrepareNurseryIndexCount > 0) &&
      (nurseriesBuildNurseryIndexCount > 0) &&

      (plantsPreparePlantIndexCount > 0) &&
      (plantsBuildPlantIndexCount > 0)
    ) {
      plantInfoDataLoaded = true;
    }
  }

  return plantInfoDataLoaded;
};
