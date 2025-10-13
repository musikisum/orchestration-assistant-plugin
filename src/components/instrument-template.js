/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Markdown from '@educandu/educandu/components/markdown.js';
import OrchestrationUtilities from '../orchestration-utilities.js';
import { getContrastColor } from '@educandu/educandu/ui/color-helper.js';

export default function InstrumentTemplate({ from, to, instrument, row }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(instrument.begin, instrument.end, from, to);
  const bgColor = instrument.color;
  const color = getContrastColor(instrument.color);
  const calculation = `${begin}/${end}`;

  const gridElemStyle = {
    gridColumn: calculation, 
    gridRow: row, 
    cursor: 'pointer',
    backgroundColor: bgColor,
    color
  };

  return (
    <div key={instrument.id} className='instrument' style={gridElemStyle}>
      <div className='instrument-beam' onClick={onInstrumentClick}>
        {t(instrument.name)}
      </div>
      {isVisible
        ? <Markdown className='instrumentDescription' renderAnchors>{instrument[t('language')]}</Markdown>
        : null}
    </div>);
}

InstrumentTemplate.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number, 
  instrument: PropTypes.object,
  row: PropTypes.number
};

InstrumentTemplate.defaultProps = {
  from: 1,
  to: 50,
  instrument: null,
  row: 0
};
