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

const getOctaveName = tonName => {
  if (tonName.length !== 2) {
    return '';
  }
  switch (tonName[1]) {
    case '1':
      return 'Kontra-Oktave';
    case '2':
      return 'große Oktave'; 
    case '3':
      return 'kleine Oktave'; 
    case '4':
      return 'eingestrichene Oktave';  
    case '5':
      return 'zweigestrichene Oktave';  
    case '6':
      return 'dreigestrichene Oktave';   
    case '7':
      return 'viergestrichene Oktave'; 
    default:
      return '';
  }
};

const OrchestrationUtilities = {
  getOctaveName,
  calculateGridColumnsForInstruments
};

export default OrchestrationUtilities;