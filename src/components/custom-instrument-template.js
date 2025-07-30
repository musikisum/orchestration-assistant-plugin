/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Markdown from '@educandu/educandu/components/markdown.js';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function CustomInstrumentTemplate({ from, to, customInstrument, row }) {

  const color = customInstrument.color ? customInstrument.color : '#6D8BB1';
  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(customInstrument.begin, customInstrument.end, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div key={customInstrument.id} className='instrument' style={{ gridColumn: calculation, gridRow: row, backgroundColor: color, color: 'white' }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        {customInstrument.name}
      </div>
      {isVisible
        ? <Markdown className='customInstrument' renderAnchors>{customInstrument.text}</Markdown>
        : null}
    </div>);
}

CustomInstrumentTemplate.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number, 
  customInstrument: PropTypes.object,
  row: PropTypes.number
};

CustomInstrumentTemplate.defaultProps = {
  from: 1,
  to: 50,
  customInstrument: null,
  row: 0
};
