import Oboe from './instruments/oboe.js';
import Horn from './instruments/horn.js';
import Tuba from './instruments/tuba.js';
import Viola from './instruments/viola.js';
import Flute from './instruments/flute.js';
import Guitar from './instruments/guitar.js';
import Violin from './instruments/violin.js';
import Bassoon from './instruments/bassoon.js';
import Trumpet from './instruments/trumpet.js';
import Clarinet from './instruments/clarinet.js';
import Trombone from './instruments/trombone.js';
import DoubleBass from './instruments/doubleBass.js';
import EnglishHorn from './instruments/englishHorn.js';
import Violoncello from './instruments/violoncello.js';
import AltoRecorder from './instruments/a-recorder.js';
import AltSaxophone from './instruments/a-saxophone.js';
import BassClarinet from './instruments/bassClarinet.js';
import SopranRecorder from './instruments/s-recorder.js';
import PiccoloFlute from './instruments/piccoloFlute.js';
import TenorSaxophone from './instruments/t-saxophone.js';
import ContraBassoon from './instruments/contraBassoon.js';

const strings = { 
  Violin, 
  Viola, 
  Violoncello, 
  DoubleBass, 
  Guitar 
};
const winds = { 
  SopranRecorder, 
  AltoRecorder, 
  Flute, 
  PiccoloFlute, 
  Oboe, 
  EnglishHorn, 
  Clarinet, 
  BassClarinet, 
  Bassoon, 
  ContraBassoon,
  AltSaxophone,
  TenorSaxophone
};

const brass = {
  Horn,
  Trumpet,
  Trombone,
  Tuba
};

const collection = { ...strings, ...winds, ... brass };

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

const instrumentsProvider = {
  loadInstruments
};
export default instrumentsProvider;