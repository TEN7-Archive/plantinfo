const {
  cloneObject
} = require("../_data/helpers.js");

/**
 * Takes a collection and return the docs for a lunr index.
 *
 * @param {Array|Object}    collection  The 11ty collection
 */
module.exports = (collection) => {
  return cloneObject(collection);
}
