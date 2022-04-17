const {
  getPagedCategoryCollection,
} = require('../_data/helpers.js');

/**
 * Takes a category collection and returns it back chunked for paging.
 *
 * @param {Array|Object}  categoryCollection    The 11ty collection with categories
 * @param {Number}        itemsPerPage          The number of items to display per page.
 * @param {String}        itemType              The term type to use for the collection.
 * @returns {Array}                             The paged collection
 */
module.exports = (categoryCollection, itemsPerPage, itemType) => {
  let uriSlugDir = '/nurseries/nursery-category/';

  return getPagedCategoryCollection(
    categoryCollection,
    itemsPerPage,
    itemType,
    uriSlugDir
  );
};
