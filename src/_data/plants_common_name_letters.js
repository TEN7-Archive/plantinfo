const getPlantInfoData = require("./plant_info_data.js");

const {
  isObject,
  getConfigPathData,
  getCollectionPathData,
  getItemByTypeAndMachineName,
} = require("../_data/helpers.js");

module.exports = async (configData) => {
  const plantInfoData = await getPlantInfoData(configData);

  let
    plantCommonNameLetterData = {},
    plantCommonNameLetterItemData = {},
    pathCommonNameLetterSlug = ''
  ;

  if (isObject(plantInfoData)) {
    let plantData = getCollectionPathData(plantInfoData, ['plants', 'data']);

    if (process.env.ELEVENTY_SERVERLESS) {
      pathCommonNameLetterSlug = getConfigPathData(configData, ['eleventy', 'serverless', 'path', 'common_name_letter_slug']);

      if (pathCommonNameLetterSlug !== '') {
        plantCommonNameLetterItemData = getItemByTypeAndMachineName(plantData, 'common_name_letters', pathCommonNameLetterSlug);

        if (plantCommonNameLetterItemData !== {}) {
          plantCommonNameLetterData[pathCommonNameLetterSlug] = plantCommonNameLetterItemData;
        }
      }
    } else {
      plantCommonNameLetterData = getCollectionPathData(plantData, ['common_name_letters']);
    }

    // console.log('plant info has ' + Object.entries(plantInfoData).length + ' items');
    // console.log('plant data has ' + Object.entries(plantData).length + ' items');
    console.log('common name letter data has ' + Object.entries(plantCommonNameLetterData).length + ' items');
  }

  return plantCommonNameLetterData;
}
