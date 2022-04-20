const getCacheData = require('../../../utils/get-cache-data.js');
const getCacheOptions = require('../../../utils/get-cache-options.js');
const getPlantInfoProcessedExternalData = require('../../../utils/get-plant-info-processed-external-data.js');
const showPerformanceTimingCheck = require('../../../utils/show-performance-timing-check.js');

let citationsExternalDetails = require("../../plant_info_metadata/citations/external.json");

module.exports = async (configData) => {
  let
    cacheCitationsExternalDetails = {
      "assetKey": "plantInfoCitationsExternalDetailsAsset",
      "getFunction": getPlantInfoProcessedExternalData,
      "staticParameters": []
    },
    cacheOptions = getCacheOptions(configData)
  ;

  const t0 = performance.now();
  // Pass through the function and parameters to get external data, cache it.
  citationsExternalDetails = await getCacheData(
    cacheCitationsExternalDetails,
    [citationsExternalDetails, configData],
    cacheOptions
  );
  const t1 = performance.now();
  showPerformanceTimingCheck('plant_info/citations/external', t0, t1);

  return citationsExternalDetails;
}
