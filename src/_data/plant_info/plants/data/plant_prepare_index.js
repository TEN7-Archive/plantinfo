const getCacheOptions = require('../../../../utils/get-cache-options.js');
const getCacheAssetNew = require("../../../../utils/get-cache-asset-new.js");
const getCacheAssetCheck = require("../../../../utils/get-cache-asset-check.js");
const getCacheAssetSave = require("../../../../utils/get-cache-asset-save.js");
const showPerformanceTimingCheck = require('../../../../utils/show-performance-timing-check.js');

const getPlantGenusData = require("./genus.js");
const getPlantSpeciesData = require("./species.js");
const getPlantVarietyData = require("./variety.js");
const getPlantCommonNameData = require("./common_name.js");
const getNurseryCatalogData = require("../../nurseries/data/nursery_catalog.js");
const getCitationReferenceData = require("../../citations/data/citation_reference.js");

const preparePlantIndex = require("../../../../utils/prepare-plant-index.js");
const writeRawIndex = require("../../../../utils/write-raw-index.js");

module.exports = async (configData) => {
  let
    cacheContents,
    cacheOptions = getCacheOptions(configData),
    cacheDetails = {
      "assetKey": "plantInfoPlantPrepareIndexExternalDataAsset",
      "getFunction": null,
      "staticParameters": []
    },
    cacheAsset = await getCacheAssetNew(cacheDetails, cacheOptions),
    genusData = {},
    speciesData = {},
    varietyData = {},
    commonNameData = {},
    nurseryCatalogData = {},
    citationReferenceData = {}
  ;

  const t0 = performance.now();
  cacheContents = await getCacheAssetCheck(cacheAsset, cacheOptions);

  if (cacheContents !== null) {
    return cacheContents;
  } else {
    // const tg0 = performance.now();
    genusData = await getPlantGenusData(configData);
    // const tg1 = performance.now();
    // showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (get genus data)', tg0, tg1);

    // const ts0 = performance.now();
    speciesData = await getPlantSpeciesData(configData);
    // const ts1 = performance.now();
    // showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (get species data)', ts0, ts1);

    // const tv0 = performance.now();
    varietyData = await getPlantVarietyData(configData);
    // const tv1 = performance.now();
    // showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (get variety data)', tv0, tv1);

    // const tcn0 = performance.now();
    commonNameData = await getPlantCommonNameData(configData);
    // const tcn1 = performance.now();
    // showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (get common name data)', tcn0, tcn1);

    // const tnc0 = performance.now();
    nurseryCatalogData = await getNurseryCatalogData(configData);
    // const tnc1 = performance.now();
    // showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (get nursery catalog data)', tnc0, tnc1);

    // const tcr0 = performance.now();
    citationReferenceData = await getCitationReferenceData(configData);
    // const tcr1 = performance.now();
    // showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index (get citation reference data)', tcr0, tcr1);

    cacheContents = preparePlantIndex(
      [genusData, speciesData, varietyData],
      commonNameData,
      nurseryCatalogData,
      citationReferenceData
    );

    writeRawIndex(
      configData['gdSearchOutputDir'],
      configData['searchData']['plants']['indexSlug'],
      cacheContents
    );

    await getCacheAssetSave(cacheAsset, cacheContents);
  }
  const t1 = performance.now();
  showPerformanceTimingCheck('plant_info/plants/data/plant_prepare_index', t0, t1);

  return cacheContents;
}
