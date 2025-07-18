import PropTypes from 'prop-types';
import Clefs from './notes/clefs.js';
import React, { useState } from 'react';
import notesFactory from './notes-factory.js';
import instrumentsProvider from './instruments-provider.js';
import OrchestrationUtilities from './orchestration-utilities.js';

export default function NotesFactory({ fromFirstNoteIndex, toLastNoteIndex }) {
  
  const noteArr = notesFactory(fromFirstNoteIndex, toLastNoteIndex);

  const columnCount = noteArr.length + 1; // +1 for clef column
  const gridStyle = { gridTemplateColumns: `repeat(${columnCount}, 1fr)` };

  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const onClick = e => {
    const target = e.target.closest('[data-name]');
    if (target) {
      const tonName = target.getAttribute('data-name');
      setName(tonName);
      setIsVisible(true);
    }
  };

  return (
    <React.Fragment>
      <div className="notes-grid" style={gridStyle}>
        <div className="note-cell">
          <Clefs />
        </div>
        {noteArr.map((NoteComponent, index) => (
          <div key={index} className="note-cell">
            <NoteComponent onClick={onClick} />
          </div>
        ))}
      </div>
      { isVisible
        ? <div className='octave-container'>
          <h1>Die {OrchestrationUtilities.getOctaveName(name)}</h1>
          Der Ton {name} gehört zur {OrchestrationUtilities.getOctaveName(name)}.
        </div>
        : null }
      <div style={{ height: '20px' }} />

      <div className="instrument-wrapper">
        <div className="notes-grid" style={gridStyle}>
          {instrumentsProvider.map((Instrument, index) => (
            <Instrument from={fromFirstNoteIndex - 1} to={toLastNoteIndex - 1} key={index} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
} 

NotesFactory.propTypes = {
  fromFirstNoteIndex: PropTypes.number,
  toLastNoteIndex: PropTypes.number
};

NotesFactory.defaultProps = {
  fromFirstNoteIndex: 1,
  toLastNoteIndex: 50
};