const getCacheOptions = require('../../../../utils/get-cache-options.js');
const getCacheAssetNew = require("../../../../utils/get-cache-asset-new.js");
const getCacheAssetCheck = require("../../../../utils/get-cache-asset-check.js");
const getCacheAssetSave = require("../../../../utils/get-cache-asset-save.js");
const showPerformanceTimingCheck = require('../../../../utils/show-performance-timing-check.js');

const getPlantIndex = require("./plant_prepare_index.js");
const getLunrIndexDocs = require("../../../../utils/get-lunr-index-docs.js");
const buildLunrIndex = require("../../../../utils/build-lunr-index.js");
const writeLunrIndex = require("../../../../utils/write-lunr-index.js");

module.exports = async (configData) => {
  let
    cacheContents,
    cacheOptions = getCacheOptions(configData),
    cacheDetails = {
      "assetKey": "plantInfoPlantBuildIndexExternalDataAsset",
      "getFunction": null,
      "staticParameters": []
    },
    cacheAsset = await getCacheAssetNew(cacheDetails, cacheOptions),
    plantIndex = {},
    plantDocs = []
  ;

  const t0 = performance.now();
  cacheContents = await getCacheAssetCheck(cacheAsset, cacheOptions);

  if (cacheContents !== null) {
    return cacheContents;
  } else {
    plantIndex = await getPlantIndex(configData);
    const tglid0 = performance.now();
    plantDocs = getLunrIndexDocs(plantIndex);
    const tglid1 = performance.now();
    showPerformanceTimingCheck('plant_info/plants/data/plant_build_index (getLunrIndexDocs)', tglid0, tglid1);

    const tb0 = performance.now();
    cacheContents = buildLunrIndex(
      plantDocs,
      configData['searchData']['plants']['refKey'],
      configData['searchData']['plants']['fieldKeys']
    );
    const tb1 = performance.now();
    showPerformanceTimingCheck('plant_info/plants/data/plant_build_index (buildLunrIndex)', tb0, tb1);

    const tw0 = performance.now();
    writeLunrIndex(
      configData['gdSearchOutputDir'],
      configData['searchData']['plants']['indexSlug'],
      cacheContents
    );
    const tw1 = performance.now();
    showPerformanceTimingCheck('plant_info/plants/data/plant_build_index (writeLunrIndex)', tw0, tw1);

    await getCacheAssetSave(cacheAsset, cacheContents);
  }
  const t1 = performance.now();
  showPerformanceTimingCheck('plant_info/plants/data/plant_build_index', t0, t1);

  return cacheContents;
}
