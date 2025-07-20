/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FlageolettVioline from '../images/flageolett-violine.js';
import ViolinFingeringTable from './violin-fingering-table.js';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function Violin({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(19, 44, from, to);  
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-strings' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Violine
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations" style={{ gridColumn: '1/-1' }}>
            <p><b>Stimmung:</b> g-d<sup>1</sup>-a<sup>1</sup>-e<sup>2</sup></p>
            <p><b>Notation:</b> klingend, hohe Beweglichkeit</p>
            <p><b>Griffbrettgrenze:</b> E-Saite = g<sup>4</sup>, im Orchester Umfang bis c<sup>4</sup> gut möglich</p>
            <p><b>Doppelgriffe:</b> Intervalle mit einer leeren Saite (sehr leicht), Sexten (leicht), Quinten, Quarten und Terzen (schwer), Oktave und Einklang (sehr schwer)</p>
            <p><b>Flageolett</b></p>
            <div className='instrument-image'>
              <FlageolettVioline width="80%" />
            </div>            
            <p><b>Spielweisen:</b> liegend (détaché), gebunden (legato), nicht gebunden (von non legato bis staccato), akzentuiert (martelé), Bogen hüpfend (spiccato), auf die Saite fallend (ricochet), über dem Griffbrett (flautando), mit der Bogenstange schlagend (col legno), mit der rechten (im Solospiel auch mit der linken) Hand gezupft (pizzicato), glissando (geschliffen), Vibrato / non Vibrato, mit Dämpfer (con sordino)</p>
            <p><b>Kombinationen:</b> Streichinstrumente können gut zur Klangverstärkung von (anderen) Streichinstrumenten oktaviert werden (z. B. die Violine I durch Violine II, Viola oder auch Cello in der Unteroktave); hohe Klangverschmelzung mit allen Holzbläsern und dem Horn, geringere Klangverschmelzung mit Trompete, Posaune und Tuba.</p>
            <p><b>Grifftechnik:</b> Beispiele für die Basis-Positionen des Dur-Tetrachords, das mit den Fingern 1–4 gespielt wird auf der a&apos;-Saite:</p>
            <ViolinFingeringTable />
            <p><b>Schulorchester:</b> Flageolett, Doppel- und Mehrfachgriffe meiden bzw. mit besonderer Vorsicht einsetzen, Umfang nur in Ausnahmefällen über der 3. Lage fordern (d&apos;&apos;&apos;).</p>
            <p><b>Literaturbeispiele für eine solistische Violine im Orchestersatz:</b></p>
            <ul>
              <li>J. Haydn, Sinfonie Nr. 6 (Hob.I:6), »Le Matin«, 4. Satz</li>
              <li>J. Brahms, 1. Sinfonie, Op. 68, 2. Satz</li>
              <li>City, Am Fenster</li>
            </ul>
        </div>)
        : null}
    </div>);
}

Violin.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

Violin.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
