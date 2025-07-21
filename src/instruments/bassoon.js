/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function Bassoon({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(7, 32, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-wood' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Fagott
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p>Das Fagott ist ein Blasinstrument aus Holz mit doppeltem Rohrblatt:</p>
            <p><b>Tonumfang:</b> b<sub>1</sub>-d<sup>2</sup> (bis f<sup>2</sup> mit speziellem Doppelrohr)</p>
            <p><b>Notation:</b> klingend</p>
            <p><b>Klangfarbe:</b> In allen Lagen für den solistischen Einsatz geeignet. Im untersten Register klangvoll und dunkel, in der kleinen Oktave eher weich und weniger dominierend, in der eingestrichenen dünn, jedoch ausdrucksvoll</p>  
            <p><b>Spielweisen:</b> mit und ohne Vibrato, gebunden (legato), gestoßen (staccato), Flatterzunge (nicht in allen Lagen), gehauchtes Blasen ohne Tonerregung, Glissando von A-f möglich, Triller (nicht in höchsten und tiefsten Registern) und Überblasen (in der Oktave ab fis), Mikrotöne (von D-d<sip>2</sip>) etc.</p>
            <p><b>Kombinationen:</b> Koppelungen zu allen Holzbläsern sind sehr gut möglich: zwischen hohem Fagottregister und tiefem Register der Flöte und Oboe im Unisono, sonst in der Oktave bzw. Doppeloktave. Im Unisonospiel ist die Fagottfarbe nicht dominierend. Durch eine Koppelung mit der Posaune im Einklang wird das Metallische des Blechblasinstruments abgeschwächt. Gute Klangmischung mit dem Horn (Klangverschmelzung). Die Doppelung der Bassstimme der Streicher ist der Normalfall der Instrumentation in der 2. Hälfte des 18. Jahrhunderts sowie im frühen 19. Jahrhundert (Haydn, Mozart, Beethoven).</p>
            <p><b>Literaturbeispiele:</b></p>
            <ul>
              <li>P. Tschaikowsky, Sinfonie Nr. 4, 2. Satz</li>
              <li>G. Donizetti, Liebestrank, 2. Akt, Nr. 19, &raquo;Una furtiva lagrima&laquo;</li>
              <li>I. Stravinsky, Le sacre du printemps, Einleitung</li>
              <li>S. Prokofiev, Peter und der Wolf, Op. 67 (&raquo;Großvater&laquo;)</li>
            </ul>
        </div>)
        : null}
    </div>);
}

Bassoon.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

Bassoon.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
