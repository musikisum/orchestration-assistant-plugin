/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function ElectricBass({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(3, 25, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-strings' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        E-Bass
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p>Der E-Bass wurde Mitte des 20. Jahrhunderts entwickelt. Er hat einen massiven Holzkorpus und vier Stahlsaiten (Stimmung wie der Kontrabass). Neben dieser Standardform gibt es zahlreiche Varianten, etwa Modelle mit mehr Saiten, alternativen Stimmungen, hohlem Korpus oder mit bundlosem Griffbrett (fretless).</p>
            <p><b>Stimmung:</b> E<sub>1</sub>-A<sub>1</sub>-D-G</p>
            <p>Fünfsaiter: mit tiefer H<sub>2</sub>- oder C<sub>2</sub>-Saite Sechssaiter: mit hoher c-Saite</p>
            <p><b>Notation:</b> eine Oktave höher als klingend (transponierendes Instrument, vgl. Kontrabass)</p>
            <p><b>Bauweise: </b>mit bis zu 22 Bünden gebräuchlich</p>      
            <p><b>Spielweisen:</b> diverse Zupftechniken, insbesondere Slap-Technik (mit dem Daumen der Zupfhand angeschlagen, angerissen, gedämpft etc.) und mit Oktaver (Oktavkoppel), weitere Effekte s. »Gitarre« (in der Praxis werden elektronische Effekte selten bzw. ausschließlich zum Solospiel verwendet). Hohe Beweglichkeit</p>
        </div>)
        : null}
    </div>);
}

ElectricBass.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

ElectricBass.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
