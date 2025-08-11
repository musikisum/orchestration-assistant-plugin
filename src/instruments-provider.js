import Oboe from './instruments/oboe.js';
import Horn from './instruments/horn.js';
import Tuba from './instruments/tuba.js';
import Harp from './instruments/harp.js'; 
import Piano from './instruments/piano.js';
import Viola from './instruments/viola.js';
import Flute from './instruments/flute.js';
import Guitar from './instruments/guitar.js';
import Violin from './instruments/violin.js';
import Bassoon from './instruments/bassoon.js';
import Trumpet from './instruments/trumpet.js';
import Clarinet from './instruments/clarinet.js';
import Trombone from './instruments/trombone.js';
import ElectricBass from './instruments/e-bass.js';
import DoubleBass from './instruments/doubleBass.js';
import CorAnglais from './instruments/corAnglais.js';
import Violoncello from './instruments/violoncello.js';
import AltoRecorder from './instruments/a-recorder.js';
import AltoSaxophone from './instruments/a-saxophone.js';
import BassClarinet from './instruments/bassClarinet.js';
import SopranoRecorder from './instruments/s-recorder.js';
import PiccoloFlute from './instruments/piccoloFlute.js';
import TenorSaxophone from './instruments/t-saxophone.js';
import ContraBassoon from './instruments/contraBassoon.js';
import defaultInstrument from './instruments/default-instrument.js';

// section of instrument components
const strings = { 
  violin: Violin, 
  viola: Viola, 
  violoncello: Violoncello, 
  doublebass: DoubleBass, 
  guitar: Guitar,
  electricbass: ElectricBass,
  piano: Piano, 
  harp: Harp
};
const winds = { 
  sopranorecorder: SopranoRecorder, 
  altorecorder: AltoRecorder, 
  flute: Flute, 
  piccoloflute: PiccoloFlute, 
  oboe: Oboe, 
  coranglais: CorAnglais, 
  clarinet: Clarinet, 
  bassclarinet: BassClarinet, 
  bassoon: Bassoon, 
  contrabassoon: ContraBassoon,
  altosaxophone: AltoSaxophone,
  tenorsaxophone: TenorSaxophone
};
const brass = {
  horn: Horn,
  trumpet: Trumpet,
  trombone: Trombone,
  tuba: Tuba
};
const collection = { ...strings, ...winds, ... brass };

const mergeSectionAndInstruments = (instruments, section) => {
  const unique = [...new Set([...instruments, ...section])];
  return unique;
};

const reduceSectionFromIntruments = (instruments, section) => {
  const sectionSet = new Set(section);
  return instruments.filter(item => !sectionSet.has(item));
};

const getModalSectionObjects = section => {
  switch (section) {
    case 'strings':
      return [...Object.values(strings)].reduce((accu, instr) => {
        const modalObj = { id: instr.id, name: instr.name };
        accu.push(modalObj);
        return accu;
      }, []);
    case 'winds':
      return [...Object.values(winds)].reduce((accu, instr) => {
        const modalObj = { id: instr.id, name: instr.name };
        accu.push(modalObj);
        return accu;
      }, []);
    case 'brass':
      return [...Object.values(brass)].reduce((accu, instr) => {
        const modalObj = { id: instr.id, name: instr.name };
        accu.push(modalObj);
        return accu;
      }, []);
    default: {
      return [...Object.values(collection)].reduce((accu, instr) => {
        const modalObj = { id: instr.id, name: instr.name };
        accu.push(modalObj);
        return accu;
      }, []);
    }
  }
};

const getInstrumentCopy = (instrument, instrumentCopy) => {
  if (instrument && !instrumentCopy) {
    return defaultInstrument(
      instrument.id, 
      instrument.name,
      instrument.section,
      instrument.begin, 
      instrument.end, 
      instrument.before,
      instrument.after,
      instrument.color,
      instrument.de,
      instrument.en
    );
  }
  if(instrument && instrumentCopy) {
    return defaultInstrument(
      instrumentCopy.id, 
      instrumentCopy.name,
      instrumentCopy.section,
      instrumentCopy.begin, 
      instrumentCopy.end,
      instrumentCopy.before,
      instrumentCopy.after, 
      instrumentCopy.color,
      instrumentCopy.de,
      instrumentCopy.en
    );
  }
  return defaultInstrument();
};

const loadInstrumentsFromNames = names => {
  const selection = [];
  if (Array.isArray(names) && names.length > 0) {
    names.forEach(name => {
      switch (name) {
        case 'tutti':
          selection.push(...Object.values(collection));
          break;
        case 'strings':
          selection.push(...Object.values(strings));
          break;
        case 'winds':
          selection.push(...Object.values(winds));
          break;
        case 'brass':
          selection.push(...Object.values(brass));
          break;
        default: {
          const instrument = collection?.[name];
          instrument ? selection.push(instrument) : selection.push(defaultInstrument());
          break;
        }
      }      
    });
  }
  const unique = [...new Map(selection.map(item => [item.id, item])).values()];
  return unique;
};

const loadInstrumentsFromIds = ids => {
  const selection = [];
  if (Array.isArray(ids) && ids.length > 0) {
    ids.forEach(id => {
      const instrument = Object.values(collection).find(item => item.id === id);
      instrument ? selection.push(instrument) : selection.push(defaultInstrument());
    });
  }
  const unique = [...new Map(selection.map(item => [item.id, item])).values()];
  return unique;
};

const instrumentsProvider = {
  getModalSectionObjects,
  getInstrumentCopy,
  loadInstrumentsFromNames,
  loadInstrumentsFromIds,
  mergeSectionAndInstruments,
  reduceSectionFromIntruments
};

export default instrumentsProvider;