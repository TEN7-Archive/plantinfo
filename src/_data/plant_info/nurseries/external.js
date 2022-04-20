const getCacheData = require('../../../utils/get-cache-data.js');
const getCacheOptions = require('../../../utils/get-cache-options.js');
const getPlantInfoProcessedExternalData = require('../../../utils/get-plant-info-processed-external-data.js');
const showPerformanceTimingCheck = require('../../../utils/show-performance-timing-check.js');

let nurseriesExternalDetails = require("../../plant_info_metadata/nurseries/external.json");

module.exports = async (configData) => {
  let
    cacheNurseriesExternalDetails = {
      "assetKey": "plantInfoNurseriesExternalDetailsAsset",
      "getFunction": getPlantInfoProcessedExternalData,
      "staticParameters": []
    },
    cacheOptions = getCacheOptions(configData)
  ;

  const t0 = performance.now();
  // Pass through the function and parameters to get external data, cache it.
  nurseriesExternalDetails = await getCacheData(
    cacheNurseriesExternalDetails,
    [nurseriesExternalDetails, configData],
    cacheOptions
  );
  const t1 = performance.now();
  showPerformanceTimingCheck('plant_info/nurseries/external', t0, t1);

  return nurseriesExternalDetails;
}
