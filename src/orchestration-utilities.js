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

const getOctaveName = toneName => {
  if (toneName.length !== 2) {
    return '';
  }
  switch (toneName[1]) {
    case '1':
      return 'kontra';
    case '2':
      return 'große'; 
    case '3':
      return 'kleine'; 
    case '4':
      return 'eingestrichene';  
    case '5':
      return 'zweigestrichene';  
    case '6':
      return 'dreigestrichene';   
    case '7':
      return 'viergestrichene'; 
    default:
      return '';
  }
};

const OrchestrationUtilities = {
  getOctaveName,
  calculateGridColumnsForInstruments
};

export default OrchestrationUtilities;