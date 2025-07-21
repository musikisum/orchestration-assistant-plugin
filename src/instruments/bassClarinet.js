/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function BassClarinet({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(9, 30, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-wood' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Bassklarinette
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p>Die Bassklarinette ist ein Längsblasinstrument aus Holz mit einfachem Rohrblatt in B-Stimmung:</p>
            <p><b>Tonumfang:</b> notiert von e-e<sup>3</sup>, klingend von D-d<sup>2</sup></p>
            <p><b>Notation:</b> transponierend, eine große None höher als klingend</p>
            <p><b>Klangfarbe:</b> Zur Klangfarbe und Spielweise vgl. Klarinette in B</p>  
            <p><b>Kombinationen:</b> Gute Klangverbindung mit der Klarinette in der Unteroktave und dem Kontrafagott in der Oberoktave. Darüber hinaus ergeben sich auch gute Klangkombinationen mit den übrigen Bassinstrumenten der Holzbläser (Fagott, Englischhorn) und Streicher (Celli, Kontrabässe). Mit den Blechbläsern eignet sich am besten die Koppelung mit dem Horn (hoher Verschmelzungsgrad).</p>
            <p><b>Literaturbeispiele:</b></p>
            <ul>
              <li>R. Strauss, Salome, Ziffer 320</li>
            </ul>
        </div>)
        : null}
    </div>);
}

BassClarinet.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

BassClarinet.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
