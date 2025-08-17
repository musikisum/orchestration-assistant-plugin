import PropTypes from 'prop-types';
import Clefs from './notes/clefs.js';
import notesFactory from './notes-factory.js';
import React, { useState, useRef } from 'react';
import OrchestrationUtilities from './orchestration-utilities.js';
import InstrumentTemplate from './components/instrument-template.js';

export default function TableOfInstruments({ 
  from, 
  to, 
  selection
}) {
  
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

  const getToneNameGrid = () => {
    return (
      <div className='toneName-grid lightGray' style={gridStyle}>
        <div style={{ marginBottom: '12px' }}>&nbsp;</div>
        {OrchestrationUtilities.getToneNames(from, to).map((tn, index) => (
          <div key={index}>{tn}</div>
        ))}
      </div>
    );
  };

  const getInstrument = (instrument, index) => {
    return (
      <React.Fragment>
        { instrument.before ? getToneNameGrid() : null }
        <div key={instrument.id} className="orchester-grid" style={gridStyle}>
          <InstrumentTemplate from={from} to={to} instrument={instrument} row={index} />
        </div>
        { instrument.after ? getToneNameGrid() : null }
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {/* create line of notes */}
      <div className="orchester-grid" style={gridStyle}>
        <div className="note-cell">
          <Clefs />
        </div>
        {noteArr.map((NoteComponent, index) => (
          <div key={`note-component-${index}`} className="note-cell">
            <NoteComponent key={index} onClick={onClick} style={{ flexGrow: 1 }} />
          </div>
        ))}
      </div>
      {/* create octave marker  */}
      <div className='octave-line' style={gridStyle}>
        {isVisible 
          ? (
            <div 
              className='octave-line-marker' 
              style={{ gridColumn: OrchestrationUtilities.getOctaveLineFractions(name, from, to) }} 
              />
          )
          : null}
      </div>
      {/* create octave info container */}
      {isVisible
        ? (
          <div className="octave-info-container">
            <div className='oc-close' onClick={() => onOctaveInfoClick(name)}>x</div>
            {visibleOctave !== null && OrchestrationUtilities.getInfo(name, visibleOctave)}
          </div>
        )
        : null}
      {/* create instruments and tone names  */}
      <div className="instrument-wrapper">
        { getToneNameGrid() }
        {          
          selection.map((instrument, index) => {
            return OrchestrationUtilities.rangeTestforVisibility(from, to, instrument.begin, instrument.end)
              ? (
                <React.Fragment key={index}>
                  { getInstrument(instrument, index) }
                </React.Fragment>
              )
              : null;
          })
        }
      </div>
    </React.Fragment>
  );
} 

TableOfInstruments.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  selection: PropTypes.array,
};

TableOfInstruments.defaultProps = {
  from: 1,
  to: 50,
  selection: [],
};