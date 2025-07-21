/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function Violoncello({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(8, 34, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-strings' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Violoncello
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
          <p>Das Violoncello ist das Bassinstrument der Geigenfamilie (Quintenstimmung, F-Löcher und die typische Korpusform), das bis in die Tenorlage hineinreicht.</p>
          <p><b>Stimmung:</b> C-G-d-a</p>
          <p><b>Notation:</b> klingend, hohe Beweglichkeit</p>
          <p><b>Griffbrettgrenze:</b> A-Saite = fis<sup>3</sup>, im Orchester Umfang bis a<sup>2</sup> gut möglich</p>
          <p><b>Doppelgriffe:</b> Intervalle mit einer leeren Saite (leicht), Quinten, Quarten, Terzen und Sexten sowie Oktaven ab der 7. Lage (sehr schwer)</p>
          <p><b>Flageolett:</b> Quart- und Quintflageolett (mit Daumenaufsatz) möglich</p>        
          <p><b>Spielweisen:</b> liegend (détaché), gebunden (legato), nicht gebunden (von non legato bis staccato), akzentuiert (martelé), Bogen hüpfend (spiccato), auf die Saite fallend (ricochet), über dem Griffbrett (flautando), mit der Bogenstange schlagend (col legno), mit der rechten (im Solospiel auch mit der linken) Hand gezupft (pizzicato), glissando (geschliffen), Vibrato / non Vibrato, mit Dämpfer (con sordino)</p>
          <p><b>Basis-Positionen der Finger 1–4:</b> chromatisch</p>
          <p><b>Kombinationen:</b> Streichinstrumente können gut zur Klangverstärkung von (anderen) Streichinstrumenten oktaviert werden (Achtung: durch die Klangfülle der Celli besteht Gefahr, dass in Koppelungen mit anderen Streichinstrumenten wie z. B. den Violinen diese überdeckt werden), Kombinationen mit den Holzbläsern (Oboe, Klarinette und Fagott) und insbesondere dem Horn gut möglich.</p>
          <p><b>Schulorhester:</b> Umfang nicht in den »Daumenlagen« fordern (d. h. nicht über g<sup>1</sup>).</p>
          <p><b>Literaturbeispiele für ein solistisches Violoncello im Orchestersatz:</b></p>
          <ul>
            <li>G. Puccini, Tosca, 3. Akt, Einleitung zur Arie des »Cavaradossi«</li>
            <li>J. Brahms, Klavierkonzert Nr. 2, B-Dur, Op. 83, 3. Satz</li>
            <li>G. Rossini, Ouverture Wilhelm Tell, Einleitung</li>
          </ul>
        </div>)
        : null}
    </div>);
}

Violoncello.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

Violoncello.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
