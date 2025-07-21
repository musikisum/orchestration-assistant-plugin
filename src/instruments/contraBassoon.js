/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function ContraBassoon({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(1, 28, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-wood' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Kontrafagott
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p>Das Kontrafagott ist ein Blasinstrument aus Holz mit doppeltem Rohrblatt:</p>
            <p><b>Tonumfang:</b> erweitert den Umfang des Fagotts um eine Oktave nach unten, B<sub>2</sub>-b</p>
            <p><b>Notation:</b> eine Oktave höher als klingend (transponierenes Instrument, vgl. Kontrabass, Bassklarinette etc.)</p>
            <p><b>Klangfarbe:</b> wird überwiegend in den tieferen Registern verwendet und solistisch für tonmalerische Effekte eingesetzt</p>  
            <p><b>Kombinationen:</b> Das Kontrafagott lässt sich mit allen Bassinstrumenten der verschiedenen Instrumentengruppen gut im unisono und/oder im Oktavspiel kombinieren (Fagott, Bassklarinette, Tuba, Horn im tiefen Register, Celli und Kontrabässe).</p>
            <p><b>Literaturbeispiele:</b></p>
            <ul>
              <li>J. Haydn, Die Schöpfung, (tonmalerisch zu den Worten: &raquo;Vor Freude brüllend steht der Löwe da...&laquo;)</li>
              <li>J. Brahms, Variationen über ein Thema von Haydn, Op. 56a</li>
            </ul>
        </div>)
        : null}
    </div>);
}

ContraBassoon.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

ContraBassoon.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
