const lunr = require("lunr");

const { getSearchDocSegments } = require("../_data/helpers.js");

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
  const tal0 = performance.now();
  const lunrIndex = lunr(function () {
    this.ref(refKey);

    console.log(fieldKeys.length + ' field keys to add to index.')
    const taf0 = performance.now();
    fieldKeys.forEach(function(fieldKey) {
      this.field(fieldKey);
    }, this);
    const taf1 = performance.now();
    showPerformanceTimingCheck('buildLunrIndex: getIndex:addFields', taf0, taf1)

    let
      searchDocCount = docs.length,
      searchDocsPerSegment = 10000,
      searchDocSegments = getSearchDocSegments(docs, searchDocsPerSegment),
      searchDocSegmentCount = searchDocSegments.length,
      searchDocSegmentTimeStart = 0,
      searchDocSegmentTimeEnd = 0,
      searchDocSegmentTime = 0,
      searchDocSegmentTotalTime = 0
    ;

    console.log(searchDocCount + ' docs to add to index.')
    console.log(searchDocSegmentCount + ' segments of docs to add to the index.')
    const tad0 = performance.now();
    // for (let docsIndex = 0; docsIndex < docs.length; docsIndex++) {
    //   addDoc(docs[docsIndex], docsIndex, this);
    // }
    for (let [segmentIndex, searchDocSegment] of searchDocSegments.entries()) {
      const tas0 = performance.now();
      for (let [docsIndex, doc] of searchDocSegment.entries()) {
        doc.id = docsIndex;
        this.add(doc);
      }
      const tas1 = performance.now();
      showPerformanceTimingCheck('buildLunrIndex: getIndex:addDocs:for loop (searchSegment ' + segmentIndex + ')', tas0, tas1);

      if (searchDocSegmentTimeStart === 0) {
        searchDocSegmentTimeStart = tas0;
      }

      searchDocSegmentTime = tas1 - tas0;
      searchDocSegmentTotalTime = searchDocSegmentTotalTime + searchDocSegmentTime;
    }
    searchDocSegmentTimeEnd = searchDocSegmentTimeStart + searchDocSegmentTotalTime;
    showPerformanceTimingCheck('buildLunrIndex: getIndex:addDocs:for loop (searchDocSegments total)', searchDocSegmentTimeStart, searchDocSegmentTimeEnd);
    // docs.forEach(function (doc, idx) {
    //   const taed0 = performance.now();
    //   addDoc(doc, idx, this);
    //   const taed1 = performance.now();
    //   if ((taed1 - taed0) > 10) {
    //     console.log('adding ' + doc.id);
    //     showPerformanceTimingCheck('buildLunrIndex: getIndex:addDoc', taed0, taed1);
    //   }
    // }, this);
    const tad1 = performance.now();
    showPerformanceTimingCheck('buildLunrIndex: getIndex:addDocs:for loop (total)', tad0, tad1);
  });
  const tal1 = performance.now();
  showPerformanceTimingCheck('buildLunrIndex: lunr', tal0, tal1);

  return lunrIndex;
}
