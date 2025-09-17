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

const getModalSectionObjects = (section, contentCollection) => {
  // For speedy lookups
  const contentById = new Map(
    Array.isArray(contentCollection)
      ? contentCollection.map(item => [item.id, item])
      : []
  );
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
  // Liste der Modal-Objekte bauen
  return Object.values(source).map(instr => {
    const content = contentById.get(instr.id);
    const hasValidContentName = content && typeof content.name === 'string' && content.name.trim() !== '';
    return {
      id: instr.id,
      name: hasValidContentName ? content.name : instr.name
    };
  });
};

const includesAll = (set, ids) => {
  return ids.every(id => set.has(id));
};

const includesAny = (set, ids) => {
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
          if (instrument) {
            selection.push(instrument);
          }
          break;
        }
      }      
    });
  }
  const unique = [...new Map(selection.map(item => [item.id, item])).values()];
  return unique;
};

const loadInstrumentsFromIds = (ids, contentCollection) => {
  const selection = [];

  if (Array.isArray(ids) && ids.length > 0) {
    ids.forEach(id => {
      // Save instrument from content collection
      let instrument = contentCollection
        ? Object.values(contentCollection).find(item => item.id === id)
        : null;
      // Otherwise restore instrument
      if (!instrument) {
        instrument = Object.values(collection).find(item => item.id === id);
      }
      if (instrument) {
        selection.push(instrument);
      }
    });
  }
  // Remove duplicates
  const unique = [...new Map(selection.map(item => [item.id, item])).values()];
  return unique;
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
  includesAll,
  includesAny,
  getDefaultInstrument,
  hasTheSameInstruments,
  getModalSectionObjects,
  loadInstrumentsFromIds,
  loadInstrumentsFromNames
};

export default instrumentsProvider;