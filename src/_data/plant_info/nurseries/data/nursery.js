const getCacheOptions = require('../../../../utils/get-cache-options.js');
const getCacheAssetNew = require("../../../../utils/get-cache-asset-new.js");
const getCacheAssetCheck = require("../../../../utils/get-cache-asset-check.js");
const getCacheAssetSave = require("../../../../utils/get-cache-asset-save.js");
const showPerformanceTimingCheck = require('../../../../utils/show-performance-timing-check.js');

const getNurseriesExternalDetails = require("../external.js");
const getNumberLetterCollection = require("../../../../utils/get-number-letter-collection.js");

module.exports = async (configData) => {
  let
    cacheContents,
    cacheOptions = getCacheOptions(configData),
    cacheDetails = {
      "assetKey": "plantInfoNurseryExternalDataAsset",
      "getFunction": null,
      "staticParameters": []
    },
    cacheAsset = await getCacheAssetNew(cacheDetails, cacheOptions),
    nurseriesExternalDetails = {},
    nurseriesExternalData = {}
  ;

  const t0 = performance.now();
  cacheContents = await getCacheAssetCheck(cacheAsset, cacheOptions);

  if (cacheContents !== null) {
    return cacheContents;
  } else {
    nurseriesExternalDetails = await getNurseriesExternalDetails(configData);
    nurseriesExternalData = nurseriesExternalDetails["data"];

    cacheContents = getNumberLetterCollection(
      nurseriesExternalData,
      configData['rootData']['nurseries']['globalDataPath'],
      configData['rootData']['nurseries']['levelsDeep'],
      configData['rootData']['nurseries']['itemType']
    );

    await getCacheAssetSave(cacheAsset, cacheContents);
  }
  const t1 = performance.now();
  showPerformanceTimingCheck('plant_info/nurseries/data/nursery', t0, t1);

  return cacheContents;
}
