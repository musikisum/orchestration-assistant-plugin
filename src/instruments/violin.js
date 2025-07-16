/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import ViolinTable from './violin-table.js';
import Flageolett from '../images/flageolett.js';

export default function Violin({ from, to }) {

  console.log(from)
  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };
  //TODO: clip instrument range at the begin, if from is greater than 20
  const begin = 20 - from;
  //TODO: clip instrument range at the end, if to is lesser than 50
  const end = 45 - from;
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
        Violine
      </div>
      {isVisible
        ? <div className="instrument-annotations">
            <p style={layout}><b>Stimmung:</b> g-d<sup>1</sup>-a<sup>1</sup>-e<sup>2</sup></p>
            <p style={layout}><b>Notation:</b> klingend, hohe Beweglichkeit</p>
            <p style={layout}><b>Griffbrettgrenze:</b> E-Saite = g4, im Orchester Umfang bis c4 gut möglich</p>
            <p style={layout}><b>Doppelgriffe:</b> Intervalle mit einer leeren Saite (sehr leicht), Sexten (leicht), Quinten, Quarten und Terzen (schwer), Oktave und Einklang (sehr schwer)</p>
            <p style={layout}><b>Flageolett</b></p>
            <div className='instrument-image'>
              <Flageolett width="80%" />
            </div>            
            <p style={layout}><b>Spielweisen:</b> liegend (détaché), gebunden (legato), nicht gebunden (von non legato bis staccato), akzentuiert (martelé), Bogen hüpfend (spiccato), auf die Saite fallend (ricochet), über dem Griffbrett (flautando), mit der Bogenstange schlagend (col legno), mit der rechten (im Solospiel auch mit der linken) Hand gezupft (pizzicato), glissando (geschliffen), Vibrato / non Vibrato, mit Dämpfer (con sordino)</p>
            <p style={layout}><b>Kombinationen:</b> Streichinstrumente können gut zur Klangverstärkung von (anderen) Streichinstrumenten oktaviert werden (z. B. die Violine I durch Violine II, Viola oder auch Cello in der Unteroktave); hohe Klangverschmelzung mit allen Holzbläsern und dem Horn, geringere Klangverschmelzung mit Trompete, Posaune und Tuba.</p>
            <p style={layout}><b>Grifftechnik:</b> Beispiele für die Basis-Positionen des Dur-Tetrachords, das mit den Fingern 1–4 gespielt wird auf der a&apos;-Saite:</p>
            <ViolinTable />
            <p style={layout}><b>Schulorchester:</b> Flageolett, Doppel- und Mehrfachgriffe meiden bzw. mit besonderer Vorsicht einsetzen, Umfang nur in Ausnahmefällen über der 3. Lage fordern (d&apos;&apos;&apos;).</p>
            <p style={layout}><b>Literaturbeispiele für eine solistische Violine im Orchestersatz:</b></p>
            <ul style={layout}>
              <li>J. Haydn, Sinfonie Nr. 6 (Hob.I:6), »Le Matin«, 4. Satz</li>
              <li>J. Brahms, 1. Sinfonie, Op. 68, 2. Satz</li>
              <li>City, Am Fenster</li>
            </ul>
          </div>
        : null}
    </div>);
}