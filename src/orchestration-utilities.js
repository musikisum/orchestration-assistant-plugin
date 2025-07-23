import React from 'react';
import One from './octaves/one.js';
import Two from './octaves/two.js';
import Four from './octaves/four.js';
import Five from './octaves/five.js';
import Gross from './octaves/great.js';
import Klein from './octaves/small.js';
import Three from './octaves/three.js';
import Contra from './octaves/contra.js';
import Error from './octaves/error-info.js';

const getOctaveComponent = (toneName, toneIndex) => {
  const octaveDescriptions = [
    <Error key='error' />,
    <Contra key='tn1' toneName={toneName} />,
    <Gross key='tn2' toneName={toneName}  />,
    <Klein key='tn3' toneName={toneName} />,
    <One key='tn4' toneName={toneName} />,
    <Two key='tn5' toneName={toneName} />,
    <Three key='tn6' toneName={toneName} />,
    <Four key='tn7' toneName={toneName} />,
    <Five key='tn8' toneName={toneName} />
  ];
  const tiNum = Number(toneIndex);
  let ti = 0;
  if (
    toneName !== null
    && toneIndex !== null
    && tiNum > 0
    && tiNum < octaveDescriptions.length
  ) {
    ti = tiNum;
  }
  return octaveDescriptions[ti];
};

const getOctaveLineFractions = (toneName, from, to) => {
  const octave = toneName.slice(-1);
  const stringNotes = [
    'c1', 'd1', 'e1', 'f1', 'g1', 'a1', 'h1',
    'c2', 'd2', 'e2', 'f2', 'g2', 'a2', 'h2',
    'c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'h3',
    'c4', 'd4', 'e4', 'f4', 'g4', 'a4', 'h4',
    'c5', 'd5', 'e5', 'f5', 'g5', 'a5', 'h5',
    'c6', 'd6', 'e6', 'f6', 'g6', 'a6', 'h6',
    'c7', 'd7', 'e7', 'f7', 'g7', 'a7', 'h7',
    'c8'
  ];
  const noteArr = stringNotes.slice(from - 1, to);
  
  const octaveTones = noteArr
    .map((name, index) => ({ name, index }))
    .filter(n => n.name.endsWith(octave));
  const startCol = octaveTones[0].index + 2; // + 2 because Clef component and 0 based index
  const endCol = octaveTones[octaveTones.length - 1].index + 3; // + 1 for end, + 2 for offset
  return `${startCol}/${endCol}`;
};

const calculateGridColumnsForInstruments = (begin, end, from, to) => {
  // No display if invalid data
  if (end < from || begin > to) {
    return [0, 0];
  }
  // set begin and end, if grid values change
  let head = begin - from + 1;
  if (from > begin) {
    head = 1;    
  }
  let tail = end - from + 1;
  if (to < end) {
    tail = to;
  }
  return [head + 1, tail + 2];
};

const getToneNames = (from, to) => {
  const toneNames = [
    'c', 'd', 'e', 'f', 'g', 'a', 'h',
    'c', 'd', 'e', 'f', 'g', 'a', 'h',
    'c', 'd', 'e', 'f', 'g', 'a', 'h',
    'c', 'd', 'e', 'f', 'g', 'a', 'h',
    'c', 'd', 'e', 'f', 'g', 'a', 'h',
    'c', 'd', 'e', 'f', 'g', 'a', 'h',
    'c', 'd', 'e', 'f', 'g', 'a', 'h',
    'c'
  ];
  return toneNames.slice(from - 1, to);
};

const OrchestrationUtilities = {
  getInfo: (toneName, toneIndex) => getOctaveComponent(toneName, toneIndex),
  calculateGridColumnsForInstruments,
  getOctaveLineFractions,
  getToneNames
};

export default OrchestrationUtilities;