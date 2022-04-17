const getCacheOptions = require('../utils/get-cache-options.js');
const getCacheAssetNew = require("../utils/get-cache-asset-new.js");
const getCacheAssetCheck = require("../utils/get-cache-asset-check.js");
const getCacheAssetSave = require("../utils/get-cache-asset-save.js");

const getPlantInfoData = require("./plant_info_data.js");
const getPlantInfoDataLoaded = require("../utils/get-plant-info-data-loaded.js");

module.exports = async (configData) => {
  let
    cacheContents,
    cacheOptions = getCacheOptions(configData),
    cacheDetails = {
      "assetKey": "plantInfoDataLoadedAsset",
      "getFunction": null,
      "staticParameters": []
    },
    cacheAsset = await getCacheAssetNew(cacheDetails, cacheOptions),
    plantInfoData = {}
  ;

  cacheContents = await getCacheAssetCheck(cacheAsset, cacheOptions);

  if (cacheContents !== null) {
    return cacheContents;
  } else {
    plantInfoData = await getPlantInfoData(configData);

    cacheContents = getPlantInfoDataLoaded(
      plantInfoData,
      configData
    );

    await getCacheAssetSave(cacheAsset, cacheContents);
  }

  return cacheContents;
}
