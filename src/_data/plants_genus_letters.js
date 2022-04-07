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
    plantGenusLetterData = {},
    plantGenusLetterItemData = {},
    pathGenusLetterSlug = ''
  ;

  if (isObject(plantInfoData)) {
    let plantData = getCollectionPathData(plantInfoData, ['plants', 'data']);

    if (process.env.ELEVENTY_SERVERLESS) {
      pathGenusLetterSlug = getConfigPathData(configData, ['eleventy', 'serverless', 'path', 'genus_letter_slug']);

      if (pathGenusLetterSlug !== '') {
        plantGenusLetterItemData = getItemByTypeAndMachineName(plantData, 'genus_letters', pathGenusLetterSlug);

        if (plantGenusLetterItemData !== {}) {
          plantGenusLetterData[pathGenusLetterSlug] = plantGenusLetterItemData;
        }
      }
    } else {
      plantGenusLetterData = getCollectionPathData(plantData, ['genus_letters']);
    }

    // console.log('plant info has ' + Object.entries(plantInfoData).length + ' items');
    // console.log('plant data has ' + Object.entries(plantData).length + ' items');
    console.log('genus letter data has ' + Object.entries(plantGenusLetterData).length + ' items');
  }

  return plantGenusLetterData;
}
