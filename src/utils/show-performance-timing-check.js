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
    timeUnit = 'milliseconds'
  ;

  if (timeInterval > 1000) {
    timeUnit = 'seconds'
    timeInterval = timeInterval/1000
  }

  let
    timeIntervalRounded = timeInterval.toFixed(DecimalsToRound),
    timingInMessage = timeIntervalRounded + ' ' + timeUnit;
  ;

  if (timeUnit === 'seconds') {
    timingInMessage = '***' + timingInMessage + '***'
  }

  let timingMessage = itemToCheck + ' took ' + timingInMessage + '.';

  console.log(timingMessage);
};
