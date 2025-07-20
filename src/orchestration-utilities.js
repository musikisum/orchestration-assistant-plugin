const calculateGridColumnsForInstruments = (begin, end, from, to) => {

  if (end < from || begin > to) {
    return [0, 0];
  }

  let head = 1;  
  if (from <= begin) {
    head = begin - from + 1;
  } 

  return [head + 1, (end - from + 1) + 2];
};

const OrchestrationUtilities = {
  calculateGridColumnsForInstruments
};

export default OrchestrationUtilities;