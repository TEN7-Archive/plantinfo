const getCacheOptions = require('../../../../utils/get-cache-options.js');
const getCacheAssetNew = require("../../../../utils/get-cache-asset-new.js");
const getCacheAssetCheck = require("../../../../utils/get-cache-asset-check.js");
const getCacheAssetSave = require("../../../../utils/get-cache-asset-save.js");
const showPerformanceTimingCheck = require('../../../../utils/show-performance-timing-check.js');

const getPlantGenusData = require("./genus.js");
const getLetterListCollection = require("../../../../utils/get-letter-list-collection.js");

module.exports = async (configData) => {
  let
    cacheContents,
    cacheOptions = getCacheOptions(configData),
    cacheDetails = {
      "assetKey": "plantInfoPlantGenusLettersExternalDataAsset",
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

    cacheContents = getLetterListCollection(
      plantGenusData,
      'genus',
    );

    await getCacheAssetSave(cacheAsset, cacheContents);
  }
  const t1 = performance.now();
  showPerformanceTimingCheck('plant_info/plants/data/genus_letters', t0, t1);

  return cacheContents;
}
