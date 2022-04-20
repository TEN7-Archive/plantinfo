const getCacheOptions = require('../../../../utils/get-cache-options.js');
const getCacheAssetNew = require("../../../../utils/get-cache-asset-new.js");
const getCacheAssetCheck = require("../../../../utils/get-cache-asset-check.js");
const getCacheAssetSave = require("../../../../utils/get-cache-asset-save.js");
const showPerformanceTimingCheck = require('../../../../utils/show-performance-timing-check.js');

const getCitationsExternalDetails = require("../external.js");
const getNumberLetterCollection = require("../../../../utils/get-number-letter-collection.js");

module.exports = async (configData) => {
  let
    cacheContents,
    cacheOptions = getCacheOptions(configData),
    cacheDetails = {
      "assetKey": "plantInfoJournalBookExternalDataAsset",
      "getFunction": null,
      "staticParameters": []
    },
    cacheAsset = await getCacheAssetNew(cacheDetails, cacheOptions),
    citationsExternalDetails = {},
    citationsExternalData = {}
  ;

  const t0 = performance.now();
  cacheContents = await getCacheAssetCheck(cacheAsset, cacheOptions);

  if (cacheContents !== null) {
    return cacheContents;
  } else {
    citationsExternalDetails = await getCitationsExternalDetails(configData);
    citationsExternalData = citationsExternalDetails["data"];

    cacheContents = getNumberLetterCollection(
      citationsExternalData,
      configData['rootData']['journals']['globalDataPath'],
      configData['rootData']['journals']['levelsDeep'],
      configData['rootData']['journals']['itemType']
    );

    await getCacheAssetSave(cacheAsset, cacheContents);
  }
  const t1 = performance.now();
  showPerformanceTimingCheck('plant_info/citations/data/journal/book', t0, t1);

  return cacheContents;
}
