const getCacheOptions = require('../../../../utils/get-cache-options.js');
const getCacheAssetNew = require("../../../../utils/get-cache-asset-new.js");
const getCacheAssetCheck = require("../../../../utils/get-cache-asset-check.js");
const getCacheAssetSave = require("../../../../utils/get-cache-asset-save.js");
const showPerformanceTimingCheck = require('../../../../utils/show-performance-timing-check.js');

const getNurseryIndex = require("./nursery_prepare_index.js");
const getLunrIndexDocs = require("../../../../utils/get-lunr-index-docs.js");
const buildLunrIndex = require("../../../../utils/build-lunr-index.js");
const writeLunrIndex = require("../../../../utils/write-lunr-index.js");

module.exports = async (configData) => {
  let
    cacheContents,
    cacheOptions = getCacheOptions(configData),
    cacheDetails = {
      "assetKey": "plantInfoNurseryBuildIndexExternalDataAsset",
      "getFunction": null,
      "staticParameters": []
    },
    cacheAsset = await getCacheAssetNew(cacheDetails, cacheOptions),
    nurseryIndex = {},
    nurseryDocs = []
  ;

  const t0 = performance.now();
  cacheContents = await getCacheAssetCheck(cacheAsset, cacheOptions);

  if (cacheContents !== null) {
    return cacheContents;
  } else {
    nurseryIndex = await getNurseryIndex(configData);
    nurseryDocs = getLunrIndexDocs(nurseryIndex);

    const tb0 = performance.now();
    cacheContents = buildLunrIndex(
      nurseryDocs,
      configData['searchData']['nurseries']['refKey'],
      configData['searchData']['nurseries']['fieldKeys']
    );
    const tb1 = performance.now();
    showPerformanceTimingCheck('plant_info/nurseries/data/nursery_build_index (buildLunrIndex)', tb0, tb1);

    const tw0 = performance.now();
    writeLunrIndex(
      configData['gdSearchOutputDir'],
      configData['searchData']['nurseries']['indexSlug'],
      cacheContents
    );
    const tw1 = performance.now();
    showPerformanceTimingCheck('plant_info/nurseries/data/nursery_build_index (writeLunrIndex)', tw0, tw1);

    await getCacheAssetSave(cacheAsset, cacheContents);
  }
  const t1 = performance.now();
  showPerformanceTimingCheck('plant_info/nurseries/data/nursery_build_index', t0, t1);

  return cacheContents;
}
