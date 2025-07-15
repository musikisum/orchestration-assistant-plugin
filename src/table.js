import React from 'react';
import Clefs from './notes/clefs.js';
import PropTypes from 'prop-types';
import notesFactory from './notes-factory.js';

export default function NotesFactory({ fromFirstNoteIndex, toLastNoteIndex }) {
  
  const noteArr = notesFactory(fromFirstNoteIndex, toLastNoteIndex);

  const columnCount = noteArr.length + 1; // +1 für Clef-Spalte
  const gridStyle = { gridTemplateColumns: `repeat(${columnCount}, 1fr)` };

  return (
    <React.Fragment>
      {/* Notenzeile */}
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
      {/* Instrumentenzeile */}
      <div className="instrument-balken-wrapper">
        {/* Der Text über dem Balken */}
        <div className="instrument-label">Violine</div>

        {/* Der braune Balken – also dein Grid */}
        <div className="notes-grid" style={gridStyle}>
          <div className="note-cell clefs-cell" />
          {noteArr.map((_, index) => (
            <div key={index} className="instrument-cell">
              {(index > 17 && index < 47) && (
              <div className="instrument-strings" />
              )}
            </div>
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