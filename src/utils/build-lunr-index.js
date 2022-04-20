const lunr = require("lunr");
const showPerformanceTimingCheck = require("./show-performance-timing-check.js");

/**
 * Takes docs and builds a lunr index.
 *
 * @param {Array}           docs  The docs for building the lunr index.
 * @param {String}          refKey      The field key to use as the unique reference.
 * @param {Array}           fieldKeys   The field keys to index.
 * @returns {Object}                    The lunr index
 */
module.exports = (docs, refKey, fieldKeys) => {
  return lunr(function () {
    this.ref(refKey);

    // console.log(fieldKeys.length + ' field keys to add to index.')
    // const taf0 = performance.now();
    fieldKeys.forEach(function(fieldKey) {
      this.field(fieldKey);
    }, this);
    // const taf1 = performance.now();
    // showPerformanceTimingCheck('buildLunrIndex: getIndex:addFields', taf0, taf1)

    // console.log(docs.length + ' docs to add to index.')
    // const tad0 = performance.now();
    // for (let docsIndex = 0; docsIndex < docs.length; docsIndex++) {
    //   addDoc(docs[docsIndex], docsIndex, this);
    // }
    for (let [docsIndex, doc] of docs.entries()) {
      doc.id = docsIndex;
      this.add(doc);
    }
    // docs.forEach(function (doc, idx) {
    //   const taed0 = performance.now();
    //   addDoc(doc, idx, this);
    //   const taed1 = performance.now();
    //   if ((taed1 - taed0) > 10) {
    //     console.log('adding ' + doc.id);
    //     showPerformanceTimingCheck('buildLunrIndex: getIndex:addDoc', taed0, taed1);
    //   }
    // }, this);
    // const tad1 = performance.now();
    // showPerformanceTimingCheck('buildLunrIndex: getIndex:addDocs:for loop', tad0, tad1);
  });
}
