import c1 from './notes/c1.js';
import d1 from './notes/d1.js';
import e1 from './notes/e1.js';
import f1 from './notes/f1.js';
import g1 from './notes/g1.js';
import a1 from './notes/a1.js';
import h1 from './notes/h1.js';
import c2 from './notes/c2.js';
import d2 from './notes/d2.js';
import e2 from './notes/e2.js';
import f2 from './notes/f2.js';
import g2 from './notes/g2.js';
import a2 from './notes/a2.js';
import h2 from './notes/h2.js';
import c3 from './notes/c3.js';
import d3 from './notes/d3.js';
import e3 from './notes/e3.js';
import f3 from './notes/f3.js';
import g3 from './notes/g3.js';
import a3 from './notes/a3.js';
import h3 from './notes/h3.js';
import c4 from './notes/c4.js';
import d4 from './notes/d4.js';
import e4 from './notes/e4.js';
import f4 from './notes/f4.js';
import g4 from './notes/g4.js';
import a4 from './notes/a4.js';
import h4 from './notes/h4.js';
import c5 from './notes/c5.js';
import d5 from './notes/d5.js';
import e5 from './notes/e5.js';
import f5 from './notes/f5.js';
import g5 from './notes/g5.js';
import a5 from './notes/a5.js';
import h5 from './notes/h5.js';
import c6 from './notes/c6.js';
import d6 from './notes/d6.js';
import e6 from './notes/e6.js';
import f6 from './notes/f6.js';
import g6 from './notes/g6.js';
import a6 from './notes/a6.js';
import h6 from './notes/h6.js';
import c7 from './notes/c7.js';
import d7 from './notes/d7.js';
import e7 from './notes/e7.js';
import f7 from './notes/f7.js';
import g7 from './notes/g7.js';
import a7 from './notes/a7.js';
import h7 from './notes/h7.js';
import c8 from './notes/c8.js';

const notesFactory = (from = 1, to = 50) => {

  const notes = [
    c1, d1, e1, f1, g1, a1, h1,
    c2, d2, e2, f2, g2, a2, h2,
    c3, d3, e3, f3, g3, a3, h3,
    c4, d4, e4, f4, g4, a4, h4,
    c5, d5, e5, f5, g5, a5, h5,
    c6, d6, e6, f6, g6, a6, h6,
    c7, d7, e7, f7, g7, a7, h7,
    c8
  ];

  const start = Math.max(0, from - 1);
  const end = Math.min(to, notes.length);

  return notes.slice(start, end);
};

export default notesFactory;