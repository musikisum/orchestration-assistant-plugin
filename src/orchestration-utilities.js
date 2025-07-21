const calculateGridColumnsForInstruments = (begin, end, from, to) => {
  // No display if invalid data
  if (end < from || begin > to) {
    return [0, 0];
  }
  // set begin and end, if grid values change
  let head = begin - from + 1;
  if (from > begin) {
    head = 1;    
  }
  let tail = end - from + 1;
  if (to < end) {
    tail = to;
  }
  return [head + 1, tail + 2];
};

const OrchestrationUtilities = {
  calculateGridColumnsForInstruments
};

export default OrchestrationUtilities;