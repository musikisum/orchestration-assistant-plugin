const calculateGridColumnsForInstruments = (begin, end, from, to) => {
  const head = Math.max(begin, from);
  const tail = Math.min(end, to);
  if (head > tail) {
    return [0, 0];
  }

  return [head, tail];
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