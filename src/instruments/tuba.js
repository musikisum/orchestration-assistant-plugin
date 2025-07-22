/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function Tuba({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(2, 26, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-brass' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Tuba
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p>Die Tuba ist ein Instrument aus Metall aus der Familie der Blechblasinstrumente.</p>
            <ul>
              <li>Altposaune</li>
              <li>Tenorposaune</li>
              <li>Bassposaune</li>
              <li>Kontrabassposaune (z.B. bei Wagner)</li>
            </ul> 
            <p><b>Stimmumfang: </b>D<sub>1</sub>-g<sup>1</sup></p> 
            <p><b>Notation:</b> klingend</p>
            <p><b>Spielweisen:</b> Zungentechnik (Doppel-, Tripel- und Flatterzunge), Vibrato, Legato, mit Dämpfer, Triller, Glissando, etc. Entgegen einem verbreiteten Vorurteil relativ hohe Beweglichkeit</p>
            <p><b>Klangfarbe:</b> Die tiefsten Pedaltöne sprechen nur schwer an, für das tiefe Register sind weiche, jedoch tragfähige Töne charakteristisch, das Mittelregister (Fis-f) kann als Hauptregister der Tuba bezeichnet werden, in der Höhe zunehmend lauter.</p>
            <p><b>Kombinationen: </b>Mit allen Blechbläsern gebräuchlich (Bassinstrument der Blechbläser), wenig Klangverschmelzung mit der Trompete; Tuba und Kontrabasstuba in Oktaven bewirkt große Klangmassierung, Koppelungen mit den Bassinstrumenten der Holzbläser (tutti) üblich, mit den höheren Holzblasinstrumenten dagegen selten (B. Britten, Violinkonzert, Solo von Tuba und Piccoloflöte), sehr homogene Klangverschmelzung mit dem Kontrabass der Streicher.</p>
            <p><b>Literaturbeispiele:</b></p>
            <ul>
              <li>G. Mahler, 1. Sinfonie in D-Dur, 3. Satz, T. 15 f.</li>
              <li>M. Mussorgsky, Bilder einer Austellung (orch. durch M. Ravel), 4. Satz (&raquo;Bydlo&laquo;)</li>
              <li>I. Stravinsky, Circus Polka komponiert für einen jungen Elefanten für Orchester (1944)</li>
            </ul>
        </div>)
        : null}
    </div>);
}

Tuba.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

Tuba.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
