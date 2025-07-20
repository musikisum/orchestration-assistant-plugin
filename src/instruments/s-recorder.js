/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function SopranRecorder({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(29, 45, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-wood' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Sopran-Blockflöte (in C)
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p>Längsflöte aus Holz in verschiedenen Größen:</p>
            <ul>
              <li>Garkleinflöte in c<sup>3</sup>, Stimmumfang: c<sup>3</sup>-d<sup>5</sup> (g<sup>5</sup>)</li>
              <li>Sopranino (Piccolo, Diskant) in f<sup>2</sup>, Stimmumfang: f<sup>2</sup>-as<sup>4</sup> (c<sup>5</sup>)</li>
              <li>Sopranblockflöte in c<sup>2</sup>, Stimmumfang: c<sup>2</sup>-es<sup>4</sup> (g<sup>4</sup>)</li>
              <li>Altblockflöte in f<sup>1</sup>, Stimmumfang: f<sup>1</sup>-as<sup>3</sup> (c<sup>4</sup>)</li>
              <li>Tenorblockflöte in c1, Stimmumfang: c<sup>1</sup>-es<sup>3</sup> (g<sup>3</sup>)</li>
              <li>Bassblockflöte in f, Stimmumfang: f-e<sup>2</sup> (as<sup>2</sup>)</li>
              <li>daneben noch Großbass- und Subbassblockflöte (in c und F), Stimmumfänge: c-es<sup>2</sup> bzw. F-g<sup>1</sup></li>
            </ul>  
            <p><b>Notation:</b> oktavierend (transponierende Instrumente, Ausnahme: Sololiteratur für Altblockflöte)</p>
            <p><b>Spielweisen:</b> legato (gebunden), gestoßen (staccato), mit viel Nebenluft (sibilando, sputato), &raquo;weißes Rauschen&laquo; (tonlos), Überblasen (Flageolett) etc., hohe Beweglichkeit</p>
            <p><b>Literaturbeispiel:</b></p>
            <ul>
              <li>J. S. Bach, Brandenburgisches Konzert Nr. 4, G-Dur, BWV 1049</li>
            </ul>
        </div>)
        : null}
    </div>);
}

SopranRecorder.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

SopranRecorder.defaultProps = {
  from: 1,
  to: 50,
  row: null  
};
