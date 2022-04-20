/**
 * Display information on performance timing.
 *
 * @param {String}       itemToCheck       The item being checked.
 * @param {Number}       timeStart         The start time.
 * @param {Number}       timeEnd           The end time.
 */
module.exports = (itemToCheck, timeStart, timeEnd) => {
  let
    DecimalsToRound = 2,
    timeInterval = timeEnd - timeStart,
    timeUnit = 'seconds',
    timeIntervalSeconds = timeInterval/1000,
    timeIntervalSecondsRounded = timeIntervalSeconds.toFixed(DecimalsToRound),
    timingMessage = itemToCheck + ' took ' + timeIntervalSecondsRounded + ' ' + timeUnit + '.'
  ;

  console.log(timingMessage);
};
