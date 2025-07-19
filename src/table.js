import PropTypes from 'prop-types';
import Clefs from './notes/clefs.js';
import React, { useState, useRef } from 'react';
import notesFactory from './notes-factory.js';
import instrumentsProvider from './instruments-provider.js';

import Gross from './octaves/gross.js';
import Contra from './octaves/contra.js';

const getOctaveComponent = (toneName, toneIndex) => {
  const octaveDescriptions = [
    <Contra key='tnC' toneName={toneName} />,
    <Gross key='tnG' toneName={toneName}  />,
  ];
  return octaveDescriptions[toneIndex - 1];
};

export default function NotesFactory({ fromFirstNoteIndex, toLastNoteIndex }) {
  
  const noteArr = notesFactory(fromFirstNoteIndex, toLastNoteIndex);

  const columnCount = noteArr.length + 1; // +1 for clef column
  const gridStyle = { gridTemplateColumns: `repeat(${columnCount}, 1fr)` };

  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [visibleOctave, setVisibleOctave] = useState(null);
  const lastClickedElementRef = useRef(null);

  const onClick = e => {
    const target = e.target.closest('[data-name]');
    if (target) {
      target.classList.add('note-highligted');
      lastClickedElementRef.current = target;
      const tonName = target.getAttribute('data-name');
      setVisibleOctave(tonName[1]);
      setName(tonName);
      setIsVisible(true);
    }
  };

  const onOctaveInfoClick = () => {
    setIsVisible(false);
    lastClickedElementRef.current.classList.remove('note-highligted');
    lastClickedElementRef.current = null;
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
      {isVisible
        ? (
          <div className="octave-container">
            <div className='oc-close' onClick={() => onOctaveInfoClick(name)}>x</div>
            {visibleOctave !== null && getOctaveComponent(name, visibleOctave)}
          </div>
        )
        : null}
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