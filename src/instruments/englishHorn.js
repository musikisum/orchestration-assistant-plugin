/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function EnglishHorn({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(18, 35, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-wood' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Englischhorn
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p>Das Englischhorn ist das Tenorinstrument der Oboenfamilie (s. Oboe).</p>
            <p><b>Notation:</b>  eine Quinte höher als klingend (transponierendes Instrument in F-Stimmung)</p>
            <p><b>Klangfarbe:</b> in der kleinen Oktave warmer und intensiver Ton, in der 1-gestrichenen Oktave mild, näselnd und klangvoll, im höchsten Register eng und unbeweglicher (für weitere Angaben s. Oboe)</p>  
            <p><b>Kombinationen:</b> Sehr gute Klangmischung insbesondere zu den Oboen, aber auch zu allen anderen Holzbläsern. Mit den Blechbläsern bieten sich Kombinationen mit dem Horn und der Trompete an. Auch mit den Streichern ergeben sich sehr gute Klangverbindungen, eine Klangverschmelzung ist in Kombination mit der Viola möglich.</p>
            <p><b>Literaturbeispiele:</b></p>
            <ul>
              <li>H. Berlioz, Symphonie fantastique, Op. 14, Beginn des 3. Satzes (Duett zwischen Oboe und Englischhorn)</li>
              <li>R. Wagner, Tristan, 3. Akt, 1. Szene</li>
              <li>G. Rossini, Ouvertüre zu Wilhelm Tell, Andante in G (T. 176 ff.)</li>
              <li>A. Dvorák, Sinfonie Nr. 9 in e-Moll, II. Satz</li>
            </ul>
        </div>)
        : null}
    </div>);
}

EnglishHorn.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

EnglishHorn.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
