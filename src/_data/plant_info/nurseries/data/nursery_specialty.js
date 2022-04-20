const getCacheOptions = require('../../../../utils/get-cache-options.js');
const getCacheAssetNew = require("../../../../utils/get-cache-asset-new.js");
const getCacheAssetCheck = require("../../../../utils/get-cache-asset-check.js");
const getCacheAssetSave = require("../../../../utils/get-cache-asset-save.js");
const showPerformanceTimingCheck = require('../../../../utils/show-performance-timing-check.js');

const getNurseryData = require("./nursery.js");
const getNurseryCategoryData = require("./nursery_category.js");
const getCategoryCollection = require("../../../../utils/get-category-collection.js");

module.exports = async (configData) => {
  let
    cacheContents,
    cacheOptions = getCacheOptions(configData),
    cacheDetails = {
      "assetKey": "plantInfoNurserySpecialtyExternalDataAsset",
      "getFunction": null,
      "staticParameters": []
    },
    cacheAsset = await getCacheAssetNew(cacheDetails, cacheOptions),
    nurseryData = {},
    nurseryCategoryData = {}
  ;

  const t0 = performance.now();
  cacheContents = await getCacheAssetCheck(cacheAsset, cacheOptions);

  if (cacheContents !== null) {
    return cacheContents;
  } else {
    nurseryData = await getNurseryData(configData);
    nurseryCategoryData = await getNurseryCategoryData(configData);

    cacheContents = getCategoryCollection(
      nurseryData,
      nurseryCategoryData,
      'specialties',
      'nursery_category'
    );

    await getCacheAssetSave(cacheAsset, cacheContents);
  }
  const t1 = performance.now();
  showPerformanceTimingCheck('plant_info/nurseries/data/nursery_speciality', t0, t1);

  return cacheContents;
}
