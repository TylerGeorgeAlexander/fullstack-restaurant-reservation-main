export function todaysDayDate() {
  return new Date().toISOString().slice(0, 10);
}

export function previousDayDate() {
  // grab the date Params for year month day format
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("date");
  // grab the day
  const day = myParam.slice(8);
  // convert the day to a number to get to previous day
  const prevDay = +day - 1;
  // concatenate the entire date
  return myParam.slice(0, 8) + prevDay;
}

export function nextDayDate() {
  // grab the date Params for year month day format
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("date");
  // grab the day
  const day = myParam.slice(8);
  // convert the day to a number to get to next day
  const nextDay = +day + 1;
  // concatenate the entire date
  return myParam.slice(0, 8) + nextDay;
}
