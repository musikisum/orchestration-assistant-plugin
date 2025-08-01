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

const orchestraStrings = ['violin', 'viola', 'violoncello', 'doublebass'];
const orchestraWinds = ['flute', 'oboe', 'clarinet', 'bassoon'];
const orchestraBrass = ['horn', 'trumpet', 'trombone'];

const getSortedInstrumentNames = () => {
  return [
    'violin', 
    'viola', 
    'violoncello', 
    'doublebass', 
    'guitar',
    'electricbass',
    'piano', 
    'harp', 
    'sopranorecorder', 
    'altorecorder', 
    'piccoloflute', 
    'flute', 
    'oboe', 
    'coranglais', 
    'clarinet', 
    'bassclarinet', 
    'bassoon', 
    'contrabassoon',
    'altosaxophone',
    'tenorsaxophone', 
    'horn', 
    'trumpet', 
    'trombone', 
    'tuba'
  ];
};

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

const tutti = {
  violin: Violin,
  viola: Viola,
  violoncello: Violoncello,
  doublebass: DoubleBass,
  guitar: Guitar,
  electricbass: ElectricBass,
  piano: Piano,
  harp: Harp,
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
  altosaxophon: AltoSaxophone,
  tenorsaxophone: TenorSaxophone,
  horn: Horn,
  trumpet: Trumpet,
  trombone: Trombone,
  tuba: Tuba
};

const collection = { ...strings, ...winds, ... brass };

const createInstrumentsFromSelection = selection => {
  const instruments = [];
  for (let index = 0; index < selection.length; index += 1) {
    const label = selection[index];
    switch (label) {
      case 'tutti':
        return getSortedInstrumentNames();
      case 'strings':
        instruments.push(...orchestraStrings);
        break;
      case 'winds':
        instruments.push(...orchestraWinds);
        break;
      case 'brass':
        instruments.push(...orchestraBrass);
        break;
      default: {
        const tempName = getSortedInstrumentNames().find(item => item === label);
        if (tempName) {            
          instruments.push(tempName);
        }
      }
        break;
    }      
  }
  return instruments;
};

const getSectionInstrumentNames = collectionName => {
  if (collectionName === 'strings') {
    return orchestraStrings;
  }
  if (collectionName === 'winds') {
    return orchestraWinds;
  }
  if (collectionName === 'brass') {
    return orchestraBrass;
  }
  if (collectionName === 'tutti') {
    return tutti;
  }
  return [];
};

const loadInstruments = names => {
  const selection = [];
  if (Array.isArray(names) && names.length > 0 && names.every(name => collection[name])) {
    names.forEach(name => {
      selection.push(collection[name]);
    });
  } else {
    selection.push(...Object.values(collection));
  }
  return selection;
};

const getInstrumentTemplate = () => {
  return {
    id: '',
    name: 'neues Instrument',
    begin: 1,
    end: 50,
    color: '#6D8BB1',
    text: ''
  };
};

const loadInstrument = name => {
  return collection[name] || getInstrumentTemplate();
};

const instrumentsProvider = {
  loadInstrument,
  loadInstruments,
  getSortedInstrumentNames,
  getSectionInstrumentNames,
  createInstrumentsFromSelection,
  getInstrumentTemplate
};
export default instrumentsProvider;