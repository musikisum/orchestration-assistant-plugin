import PropTypes from 'prop-types';
import Clefs from './notes/clefs.js';
import notesFactory from './notes-factory.js';
import React, { useState, useRef } from 'react';
import octaveInfoProvider from './octave-info-provider.js';
import instrumentsProvider from './instruments-provider.js';

export default function NotesFactory({ from, to }) {
  
  const noteArr = notesFactory(from, to);

  const columnCount = noteArr.length + 1; // +1 for clef column
  const gridStyle = { gridTemplateColumns: `repeat(${columnCount}, 1fr)` };

  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [visibleOctave, setVisibleOctave] = useState(null);
  const lastClickedElementRef = useRef(null);

  const onClick = e => {
    const target = e.target.closest('[data-name]');
    if (target) {
      if (lastClickedElementRef.current) {
        lastClickedElementRef.current.classList.remove('note-highligted');
      }
      target.classList.add('note-highligted');
      lastClickedElementRef.current = target;
      const toneName = target.getAttribute('data-name');
      setVisibleOctave(toneName[1]);
      setName(toneName);
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
          <div key={`note-component-${index}`} className="note-cell">
            <NoteComponent onClick={onClick} />
          </div>
        ))}
      </div>
      <div className='octave-line' style={gridStyle}>
        {isVisible 
          ? (
            <div 
              className='octave-line-marker' 
              style={{ gridColumn: octaveInfoProvider.getOctaveLineFractions(name, from, to) }} 
              />
          )
          : null}
      </div>
      {isVisible
        ? (
          <div className="octave-info-container">
            <div className='oc-close' onClick={() => onOctaveInfoClick(name)}>x</div>
            {visibleOctave !== null && octaveInfoProvider.getInfo(name, visibleOctave)}
          </div>
        )
        : null}
      <div style={{ height: '20px' }} />

      <div className="instrument-wrapper">
        <div className="notes-grid" style={gridStyle}>
          {instrumentsProvider.map((Instrument, index) => (
            <Instrument key={`instrument-index-${index}`} from={from - 1} to={to - 1} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
} 

NotesFactory.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number
};

NotesFactory.defaultProps = {
  from: 1,
  to: 50
};