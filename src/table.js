import React from 'react';
import PropTypes from 'prop-types';
import Clefs from './notes/clefs.js';
import notesFactory from './notes-factory.js';
import instrumentsProvider from './instruments-provider.js';

export default function NotesFactory({ fromFirstNoteIndex, toLastNoteIndex }) {
  
  const noteArr = notesFactory(fromFirstNoteIndex, toLastNoteIndex);

  const columnCount = noteArr.length + 1; // +1 for clef column
  const gridStyle = { gridTemplateColumns: `repeat(${columnCount}, 1fr)` };

  return (
    <React.Fragment>
      <div className="notes-grid" style={gridStyle}>
        <div className="note-cell">
          <Clefs />
        </div>
        {noteArr.map((NoteComponent, index) => (
          <div key={index} className="note-cell">
            <NoteComponent />
          </div>
        ))}
      </div>
      <div style={{ height: '20px' }} />

      <div className="instrument-wrapper">
        <div className="notes-grid" style={gridStyle}>
          {instrumentsProvider.map((Instrument, index) => (
            <Instrument from={fromFirstNoteIndex - 1} to={toLastNoteIndex - 1} key={index} />
          ))}
          <div className="instrument-strings" style={{ gridColumn: '9/35' }}>Violoncello</div>
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