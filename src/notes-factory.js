import React from 'react';
import PropTypes from 'prop-types';
import clefs from './notes/clefs.js';
import note24 from './notes/24.js';
import note25 from './notes/25.js';
import note26 from './notes/26.js';
import note27 from './notes/27.js';
import note28 from './notes/28.js';
import note29 from './notes/29.js';
import note30 from './notes/30.js';
import note31 from './notes/31.js';
import note32 from './notes/32.js';
import note33 from './notes/33.js';
import note34 from './notes/34.js';
import note35 from './notes/35.js';
import note36 from './notes/36.js';
import note37 from './notes/37.js';
import note38 from './notes/38.js';
import note39 from './notes/39.js';

export default function NotesFactory({ fromMidi, toMidi }) {

  const noteArr = [ clefs, note24, note25, note26, note27, note28, note29, note30, note31, note32, note33, note34, note35, note36, note37, note38, note39 ];
  const first = Math.max(fromMidi - 24, 0);
  const last = Math.min(toMidi - 24, noteArr.length - 1);
  const currentNotes = noteArr.slice(first, last + 1);

  return (
    <div className="notes-container">
      {currentNotes.map((NoteComponent, index) => (
        <div key={index} className='note-wrapper'>
          <NoteComponent />
        </div>
      ))}
    </div>
  );
} 

NotesFactory.propTypes = {
  fromMidi: PropTypes.number,
  toMidi: PropTypes.number
};

NotesFactory.defaultProps = {
  fromMidi: 24,
  toMidi: 108
};