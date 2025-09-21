import { nanoid } from 'nanoid';
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
import Timpani from './instruments/timpani.js';
import Clarinet from './instruments/clarinet.js';
import Trombone from './instruments/trombone.js';
import ElectricBass from './instruments/e-bass.js';
import DoubleBass from './instruments/double-bass.js';
import CorAnglais from './instruments/cor-anglais.js';
import Violoncello from './instruments/violoncello.js';
import AltoRecorder from './instruments/a-recorder.js';
import AltoSaxophone from './instruments/a-saxophone.js';
import BassClarinet from './instruments/bass-clarinet.js';
import SopranoRecorder from './instruments/s-recorder.js';
import PiccoloFlute from './instruments/piccolo-flute.js';
import TenorSaxophone from './instruments/t-saxophone.js';
import ContraBassoon from './instruments/contra-bassoon.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import defaultInstrument from './instruments/default-instrument.js';

// section of instrument collections
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

const other = {
  timpani: Timpani
};

const collection = { ...strings, ...winds, ... brass, ...other };

// section for helper functions

const uniqueById = list => {
  const seen = new Set();
  return list.filter(item => {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      return true;
    } 
    return false;
  });
};

const getModalSectionObjects = (section, instrumentsSelection) => {
  let source;
  switch (section) {
    case 'strings':
      source = strings;
      break;
    case 'winds':
      source = winds;
      break;
    case 'brass':
      source = brass;
      break;
    case 'other':
      source = other;
      break;
    default:
      source = collection;
  }
  return Object.values(source).map(instr => {
    const content = Array.isArray(instrumentsSelection)
      ? instrumentsSelection.find(it => it.id === instr.id)
      : null;

    let name;
    if (content && typeof content.name === 'string' && content.name.trim()) {
      name = content.name;
    } else if (typeof instr.name === 'string' && instr.name.trim()) {
      name = instr.name;
    } else {
      name = '(unnamed)';
    }
    return { id: instr.id, name };
  });
};

const includesAll = (set, ids) => {
  if (!(set instanceof Set) || !Array.isArray(ids)) {
    return false;
  };
  return ids.every(id => set.has(id));
};

const includesAny = (set, ids) => {
  if (!(set instanceof Set) || !Array.isArray(ids)) {
    return false;
  };
  return ids.some(id => set.has(id));
};

const getDefaultInstrument = () => {
  return defaultInstrument(`custom-${nanoid(10)}`);
};

const loadInstrumentsFromNames = names => {
  const selection = [];
  if (Array.isArray(names) && names.length > 0) {
    names.forEach(name => {
      switch (name) {
        case 'tutti':
          selection.push(...Object.values(collection).map(cloneDeep));
          break;
        case 'strings':
          selection.push(...Object.values(strings).map(cloneDeep));
          break;
        case 'winds':
          selection.push(...Object.values(winds).map(cloneDeep));
          break;
        case 'brass':
          selection.push(...Object.values(brass).map(cloneDeep));
          break;
        default: {
          const instrument = collection?.[name];
          if (instrument) {
            selection.push(cloneDeep(instrument));
          }
          break;
        }
      }      
    });
  }
  // Remove duplicates (first wins)
  const seen = new Set();
  const unique = selection.filter(item => {
    if (seen.has(item.id)) { 
      return false;
    };
    seen.add(item.id);
    return true;
  });
  return unique;
};

const loadInstrumentsFromIds = (ids, contentList) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    return [];
  }  
  const selection = ids
    .filter(id => id && typeof id === 'string')
    .map(id => {
      const fromContent = Array.isArray(contentList)
        ? contentList.find(item => item?.id === id)
        : null;      
      if (fromContent) {
        return fromContent;
      };      
      const fromDefault = Object.values(collection)
        .find(item => item?.id === id);      
      return fromDefault && typeof fromDefault === 'object' 
        ? cloneDeep(fromDefault) 
        : null;
    })
    .filter(Boolean);  
  return uniqueById(selection); 
};

const getOrchestraSets = { 
  orch1760: ['oap-default-flute', 'oap-default-oboe', 'oap-default-bassoon', 'oap-default-horn', 'oap-default-violin', 
    'oap-default-viola', 'oap-default-violoncello', 'oap-default-doublebass'],
  orch1810: ['oap-default-piccoloflute', 'oap-default-flute', 'oap-default-oboe', 'oap-default-clarinet', 'oap-default-bassoon', 
    'oap-default-contrabassoon', 'oap-default-horn', 'oap-default-trumpet', 'oap-default-trombone', 'oap-default-timpani', 'oap-default-violin', 
    'oap-default-viola', 'oap-default-violoncello', 'oap-default-doublebass']
};

const getChamberSets = { 
  string3: ['oap-default-violin', 'oap-default-viola', 'oap-default-violoncello'],
  piano3: ['oap-default-violin', 'oap-default-violoncello', 'oap-default-piano'],
  horn3: ['oap-default-horn', 'oap-default-violin', 'oap-default-piano'],
  piano4: ['oap-default-violin', 'oap-default-viola', 'oap-default-violoncello', 'oap-default-piano'],
  flute4: ['oap-default-flute', 'oap-default-violin', 'oap-default-viola', 'oap-default-violoncello'],
  clarinet5: ['oap-default-clarinet', 'oap-default-violin', 'oap-default-viola', 'oap-default-violoncello'],
  septett: ['oap-default-clarinet', 'oap-default-horn', 'oap-default-bassoon', 'oap-default-violin', 'oap-default-viola', 'oap-default-violoncello'],
  octett: ['oap-default-clarinet', 'oap-default-horn', 'oap-default-bassoon', 'oap-default-violin', 'oap-default-viola', 'oap-default-violoncello', 'oap-default-doublebass']
};

const getSets = { ...getOrchestraSets, ...getChamberSets };

const hasTheSameInstruments = (setA, setB) => {
  return Array.isArray(setA) 
  && Array.isArray(setB) 
  && setA.length === setB.length 
  && setA.every(instr => setB.includes(instr));
};

const instrumentsProvider = {
  getOrchestraSets,
  getChamberSets,
  getSets,
  uniqueById,
  includesAll,
  includesAny,
  getDefaultInstrument,
  hasTheSameInstruments,
  getModalSectionObjects,
  loadInstrumentsFromIds,
  loadInstrumentsFromNames
};

export default instrumentsProvider;