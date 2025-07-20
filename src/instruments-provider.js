import Viola from './instruments/viola.js';
import Flute from './instruments/flute.js';
import Guitar from './instruments/guitar.js';
import Violin from './instruments/violin.js';
import DoubleBass from './instruments/DoubleBass.js';
import Violoncello from './instruments/violoncello.js';
import AltoRecorder from './instruments/a-recorder.js';
import SopranRecorder from './instruments/s-recorder.js';

const strings = [Violin, Viola, Violoncello, DoubleBass, Guitar];
const winds = [SopranRecorder, AltoRecorder, Flute];

const collection = [... strings, ...winds];

export default collection;