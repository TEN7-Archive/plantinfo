const getCacheAssetNew = require("./get-cache-asset-new.js");
const getCacheAssetCheck = require("./get-cache-asset-check.js");
const getCacheFunctionContents = require("./get-cache-function-contents.js");
const getCacheAssetSave = require("./get-cache-asset-save.js");

/**
 * Takes a collection and returns it back with the attached items by type, then
 * sort by machine name.
 *
 * @param {Object}       cache                  The cache configuration,
 *                                              containing the following keys:
 *                                              - @param {String} assetKey
 *                                                - The key used for caching
 *                                              - @param {String} getFunction
 *                                                - The function to get the data
 *                                              - @param {String} staticParameters
 *                                                - The function to get the data
 * @param {Object}       dynamicParameters      The params for the function.
 * @param {Object}       cacheOptions           The options used for caching.
 * @returns {Object}                             The cache contents
 */
module.exports = async (cache, dynamicParameters, cacheOptions) => {
  let
    cacheContents = null,
    cacheAsset = await getCacheAssetNew(cache, cacheOptions)
  ;

  cacheContents = await getCacheAssetCheck(cacheAsset, cacheOptions);

  if (cacheContents !== null) {
    return cacheContents;
  } else {
    cacheContents = await getCacheFunctionContents(cache, dynamicParameters, cacheOptions);

    await getCacheAssetSave(cacheAsset, cacheContents);
  }

  return cacheContents;
};
