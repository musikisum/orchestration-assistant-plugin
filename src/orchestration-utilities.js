const calculateGridColumnsForInstruments = (begin, end, from, to) => {
  const head = Math.max(begin + 1, from + 1);
  const tail = Math.min(end + 2, to + 2);
  if (head > tail) {
    return [0, 0];
  }

  return [head, tail];
};

const OrchestrationUtilities = {
  calculateGridColumnsForInstruments
};

export default OrchestrationUtilities;