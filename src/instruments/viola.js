/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import FlageolettViola from '../images/flageolett-viola.js';
import ViolaFingeringTable from './viola-fingering-table.js';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function Viola({ from, to }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(16, 43, from, to); 
  const calculation = `${begin}/${end}`;

  const layout = {
    lineHeight: '1.4em',
    fontSize: '0.9em',
    marginBottom: '6px',
    marginTop: 0
  };

  return (
    <div className='instrument-strings' style={{ gridColumn: calculation }}>
      <div onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Viola
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p style={layout}><b>Stimmung:</b> c-g-d<sup>1</sup>-a<sup>1</sup></p>
            <p style={layout}><b>Notation:</b> klingend, hohe Beweglichkeit</p>
            <p style={layout}><b>Griffbrettgrenze:</b> A-Saite = a<sup>3</sup>, im Orchester Umfang bis c<sup>3</sup> gut möglich</p>
            <p style={layout}><b>Doppelgriffe:</b> Intervalle mit einer leeren Saite (sehr leicht), Sexten (leicht), Quinten, Quarten und Terzen (schwer), Oktave und Einklang (sehr schwer)</p>
            <p style={layout}><b>Flageolett</b></p>
            <div className='instrument-image'>
              <FlageolettViola width="80%" />
            </div>            
            <p style={layout}><b>Spielweisen:</b> liegend (détaché), gebunden (legato), nicht gebunden (von non legato bis staccato), akzentuiert (martelé), Bogen hüpfend (spiccato), auf die Saite fallend (ricochet), über dem Griffbrett (flautando), mit der Bogenstange schlagend (col legno), mit der rechten (im Solospiel auch mit der linken) Hand gezupft (pizzicato), glissando (geschliffen), Vibrato / non Vibrato, mit Dämpfer (con sordino)</p>
            <p style={layout}><b>Kombinationen:</b> Streichinstrumente können gut zur Klangverstärkung von (anderen) Streichinstrumenten oktaviert werden (z. B. die Violine I durch Violine II, Viola oder auch Cello in der Unteroktave); hohe Klangverschmelzung mit allen Holzbläsern und dem Horn, geringere Klangverschmelzung mit Trompete, Posaune und Tuba.</p>
            <p style={layout}><b>Grifftechnik:</b> Beispiele für die Basis-Positionen des Dur-Tetrachords, das mit den Fingern 1–4 gespielt wird auf der d&apos;-Saite:</p>
            <ViolaFingeringTable />
            <p style={layout}><b>Schulorchester:</b> Flageolett, Doppel- und Mehrfachgriffe meiden bzw. mit besonderer Vorsicht einsetzen, Umfang nur in Ausnahmefällen über der 3. Lage fordern (d&apos;&apos;&apos;).</p>
            <p style={layout}><b>Literaturbeispiele für eine solistische Viola im Orchestersatz:</b></p>
            <ul style={layout}>
              <li>H. Berlioz, Harold in Italien, Op. 16, 1. Satz</li>
              <li>R. Wagner, Die Meistersinger, 2. Akt (3. und 7. Szene), 3. Akt (5. Szene)</li>
            </ul>
        </div>)
        : null}
    </div>);
}

Viola.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number
};

Viola.defaultProps = {
  from: 1,
  to: 50
};
