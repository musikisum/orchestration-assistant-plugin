import PropTypes from 'prop-types';
import Clefs from './notes/clefs.js';
import notesFactory from './notes-factory.js';
import React, { useState, useRef } from 'react';
import OrchestrationUtilities from './orchestration-utilities.js';
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
      <div className="orchester-grid" style={gridStyle}>
        <div className="note-cell">
          <Clefs />
        </div>
        {noteArr.map((NoteComponent, index) => (
          <div key={`note-component-${index}`} className="note-cell">
            <NoteComponent onClick={onClick} style={{ flexGrow: 1 }} />
          </div>
        ))}
      </div>
      <div className='octave-line' style={gridStyle}>
        {isVisible 
          ? (
            <div 
              className='octave-line-marker' 
              style={{ gridColumn: OrchestrationUtilities.getOctaveLineFractions(name,from, to) }} 
              />
          )
          : null}
      </div>
      {isVisible
        ? (
          <div className="octave-info-container">
            <div className='oc-close' onClick={() => onOctaveInfoClick(name)}>x</div>
            {visibleOctave !== null && OrchestrationUtilities.getInfo(name, visibleOctave)}
          </div>
        )
        : null}
      <div className="instrument-wrapper">
        <div className='toneName-grid lightGray' style={gridStyle}>
          <div style={{ marginBottom: '12px' }}>&nbsp;</div>
          {OrchestrationUtilities.getToneNames(from, to).map((tn, index) => (
            <div key={`toneName1-${index}`}>{tn}</div>
          ))}
        </div>
        <div className="orchester-grid" style={gridStyle}>
          {instrumentsProvider.loadStrings().map((Instrument, index) => (
            <Instrument key={`instrument-index-${index}`} from={from} to={to} row={index + 1}  />
          ))}
        </div>
        <div className='toneName-grid lightGray' style={gridStyle}>
          <div style={{ marginBottom: '12px' }}>&nbsp;</div>
          {OrchestrationUtilities.getToneNames(from, to).map((tn, index) => (
            <div key={`toneName2-${index}`}>{tn}</div>
          ))}
        </div>
        <div className="orchester-grid" style={gridStyle}>
          {instrumentsProvider.loadWinds().map((Instrument, index) => (
            <Instrument key={`instrument-index-${index}`} from={from} to={to} row={index + 1}  />
          ))}
        </div>
        <div className='toneName-grid lightGray' style={gridStyle}>
          <div style={{ marginBottom: '12px' }}>&nbsp;</div>
          {OrchestrationUtilities.getToneNames(from, to).map((tn, index) => (
            <div key={`toneName3-${index}`}>{tn}</div>
          ))}
        </div>
        <div className="orchester-grid" style={gridStyle}>
          {instrumentsProvider.loadBrass().map((Instrument, index) => (
            <Instrument key={`instrument-index-${index}`} from={from} to={to} row={index + 1}  />
          ))}
        </div>
        <div className='toneName-grid lightGray' style={gridStyle}>
          <div style={{ marginBottom: '12px' }}>&nbsp;</div>
          {OrchestrationUtilities.getToneNames(from, to).map((tn, index) => (
            <div key={`toneName-${index}`}>{tn}</div>
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