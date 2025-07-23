/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Pedale1 from '../images/pedale-1.js';
import Pedale2 from '../images/pedale-2.js';
import Pedale3 from '../images/pedale-3.js';
import Pedale4 from '../images/pedale-4.js';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function Harp({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(1, 47, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-strings' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Harfe
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p>Die Doppelharfe ist ein Saiteninstrument mit Ces-Dur-Stimmung und 47 Saiten.</p>
            <p><b>Notation:</b> klingend, in zwei Systemen (wie das Pianoforte)</p>
            <p><b>Tonumfang:</b> Ces<sub>1</sub>-g<sup>4</sup></p>
            <p><b>Pedaltechnik:</b> Es gibt 7 Pedale zur chromatischen Veränderung der Stammtöne:</p>
            <div className='svg-container' style={{ margin: '24px' }}>
              <Pedale1 />
            </div>      
            <div className='svg-container' style={{ margin: '24px' }}>
              <Pedale2 />
            </div>      
            <div className='svg-container' style={{ margin: '24px' }}>
              <Pedale3 />
            </div>            
            <p>Beispiel: Die Pedalstellung für die harmonische d-Molltonleiter (Zählung der Pedale von links nach rechts):</p>
            <div className='svg-container' style={{ margin: '24px' }}>
              <Pedale4 />
            </div>    
            <ul>
              <li>d = Mittelstellung des 1. Pedals</li>
              <li>e = Mittelstellung des 4. Pedals</li>
              <li>f = Mittelstellung des 5. Pedals</li>
              <li>g = Mittelstellung des 6. Pedals</li>
              <li>a = Mittelstellung des 7. Pedals</li>
              <li>b = Hochstellung des 3. Pedals</li>
              <li>cis = Tiefstellung des 2. Pedals</li>
            </ul>
            <p>Eine Pedalbewegung wirkt sich auf einen Ton und alle seine Oktaväquivalente aus.</p>
            <p><b>Spielweisen:</b> mit der Hand, dem Handballen, den Fingern (der kleine Finger wird nicht verwendet), Handflächen und -rücken, schlagen, zupfen und reißen, mit den Fingernägeln gedämpft (Klirreffekt) bzw. gleich nach dem Zupfen abgedämpft (Sons étouffés), nahe am Resonanzkörper (Prés de la table), Glissando (nicht chromatisch), Flageolett (nur Oktav-) etc.</p>
            <p><b>Kombinationen:</b> Die Harfe ist ein bevorzugt solistisches Instrument, das sehr leise ist und leicht von anderen Instrumenten überdeckt werden kann. Die Klangverbindung mit den Streichern ist gut (z. B. Harfenflageolett und Violinen), darüber hinaus kann die Harfe mit ihren tiefen Tönen im piano auch den Kontrabass ersetzen. Gute Klangverbindungen bestehen auch zwischen Harfe und Flöte sowie Harfe und Horn.</p>
            <p><b>Literaturbeispiele:</b></p>
            <ul>
              <li>P. Tschaikowsky, Schwanensee-Suite, Nr. 4, &raquo;Szene&laquo;</li>
              <li>Cl. Debussy, Prélude à l&apos;après-midi d&apos;un faune</li>
              <li>G. Mahler, Sinfonie Nr. 5 in cis-Moll, 4. Satz, Adagietto</li>
              <li>A. Webern, Sechs Stücke für Orchester, Op. 6</li>
            </ul>
        </div>)
        : null}
    </div>);
}

Harp.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

Harp.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
