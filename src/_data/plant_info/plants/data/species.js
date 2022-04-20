const getCacheOptions = require('../../../../utils/get-cache-options.js');
const getCacheAssetNew = require("../../../../utils/get-cache-asset-new.js");
const getCacheAssetCheck = require("../../../../utils/get-cache-asset-check.js");
const getCacheAssetSave = require("../../../../utils/get-cache-asset-save.js");
const showPerformanceTimingCheck = require('../../../../utils/show-performance-timing-check.js');

const getPlantGenusData = require("./genus.js");
const getElementItemsCollection = require("../../../../utils/get-element-items-collection.js");

module.exports = async (configData) => {
  let
    cacheContents,
    cacheOptions = getCacheOptions(configData),
    cacheDetails = {
      "assetKey": "plantInfoPlantSpeciesExternalDataAsset",
      "getFunction": null,
      "staticParameters": []
    },
    cacheAsset = await getCacheAssetNew(cacheDetails, cacheOptions),
    plantGenusData = {}
  ;

  const t0 = performance.now();
  cacheContents = await getCacheAssetCheck(cacheAsset, cacheOptions);

  if (cacheContents !== null) {
    return cacheContents;
  } else {
    plantGenusData = await getPlantGenusData(configData);

    cacheContents = getElementItemsCollection(
      plantGenusData,
      'species',
      false
    );

    await getCacheAssetSave(cacheAsset, cacheContents);
  }
  const t1 = performance.now();
  showPerformanceTimingCheck('plant_info/plants/data/species', t0, t1);

  return cacheContents;
}
