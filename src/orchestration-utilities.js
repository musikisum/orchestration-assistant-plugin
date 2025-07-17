const calculateGridColumnsForInstruments = (begin, end, fromFirstNoteIndex, toLastNoteIndex) => {
  let from = begin;
  let to = end;
  if (fromFirstNoteIndex > 1) {
    begin - fromFirstNoteIndex;
  }
  if (begin < fromFirstNoteIndex) {
    from = fromFirstNoteIndex;
  }
  if (end < toLastNoteIndex) {
    to = end;
  }
  if (from > end) {
    from = 0;
    to = 0; 
  }
  return [from, to];
};

const OrchestrationUtilities = {
  calculateGridColumnsForInstruments
};

export default OrchestrationUtilities;