/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Markdown from '@educandu/educandu/components/markdown.js';
import OrchestrationUtilities from '../orchestration-utilities.js';
import { getContrastColor } from '@educandu/educandu/ui/color-helper.js';

export default function CustomInstrumentTemplate({ from, to, customInstrument, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(customInstrument.begin, customInstrument.end, from, to);
  const bgColor = customInstrument.color;
  const color = getContrastColor(customInstrument.color);
  const calculation = `${begin}/${end}`;

  const gridElemStyle = {
    gridColumn: calculation, 
    gridRow: row, 
    cursor: 'pointer',
    backgroundColor: bgColor,
    color
  };

  return (
    <div key={customInstrument.id} className='instrument' style={gridElemStyle}>
      <div className='instrument-beam' onClick={onInstrumentClick}>
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
