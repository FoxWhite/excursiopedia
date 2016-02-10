const normalizeCountry = (value, previousValue, allValues, previousAllValues) => {
  console.log('======NORMALIZER==========');
  console.log('value',value, 'previousValue', previousValue, 'allValues',allValues.suggestedCountry ,'previousAllValues',previousAllValues.suggestedCountry);
  // console.log(allValues.suggestedCountry );
  if (allValues.suggestedCountry !== previousAllValues.suggestedCountry) {
    // country selector changed
    return allValues.suggestedCountry;
  }

  // if (value === previousValue) {
  //   console.log('suggested:', allValues.suggestedCountry);
  //   return allValues.suggestedCountry;
  // }
  else return value;
};


module.exports = {normalizeCountry}