const getCacheOptions = require('../../../utils/get-cache-options.js');
const getCacheAssetNew = require("../../../utils/get-cache-asset-new.js");
const getCacheAssetCheck = require("../../../utils/get-cache-asset-check.js");
const getCacheAssetSave = require("../../../utils/get-cache-asset-save.js");
const showPerformanceTimingCheck = require('../../../utils/show-performance-timing-check.js');

const getPlantInfoSimpleExternalData = require('../../../utils/get-plant-info-simple-external-data.js');

const getNurseriesExternalDetails = require("./external.js");
let termsExternalDetails = require("../../plant_info_metadata/nurseries/terms.json");

module.exports = async (configData) => {
  let
    cacheContents,
    cacheOptions = getCacheOptions(configData),
    cacheDetails = {
      "assetKey": "plantInfoTermsExternalDetailsAsset",
      "getFunction": getPlantInfoSimpleExternalData,
      "staticParameters": []
    },
    cacheAsset = await getCacheAssetNew(cacheDetails, cacheOptions),
    nurseriesExternalDetails = {}
  ;

  const t0 = performance.now();
  cacheContents = await getCacheAssetCheck(cacheAsset, cacheOptions);

  if (cacheContents !== null) {
    return cacheContents;
  } else {
    nurseriesExternalDetails = await getNurseriesExternalDetails(configData);

    cacheContents = await getPlantInfoSimpleExternalData(
      nurseriesExternalDetails,
      termsExternalDetails,
      configData
    );

    await getCacheAssetSave(cacheAsset, cacheContents);
  }
  const t1 = performance.now();
  showPerformanceTimingCheck('plant_info/nurseries/terms', t0, t1);

  return cacheContents;
}

