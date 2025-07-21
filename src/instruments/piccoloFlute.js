/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function PiccoloFlute({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(30, 51, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-brass' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Piccoloflöte
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p>Die Piccoloflöte ist ein Blasinstrument aus Metall (auch Holz), erweitert den Umfang der (großen) Flöten im Orchester um eine Oktave nach oben.</p>
            <p><b>Tonumfang;</b> d<sup>2</sup>-c<sup>5</sup></p>
            <p><b>Notation:</b> eine Oktave tiefer als klingend (transponierendes Instrument)</p>
            <p><b>Klangfarbe:</b> im untersten Register leiser und hohler Klang, in der 2-3-gestrichenen Oktave dann weich und lieblich, in der 3-4-gestrichenen Oktave sehr hell und klar und im obersten Register schrill und schneidend</p>      
            <p><b>Spielweisen:</b> mit und ohne Vibrato, gebunden (legato), gestoßen (staccato), Flatterzunge, Gutturaltöne (gleichzeitig mit notierten Tönen), mit viel Luft (sibilando, sputato), glissandoartiges Ansetzen der Töne, Whistle-Ton (entspannter Ansatz und geringster Luftsstrom: es erklingen harmonische Obertöne), Überblasen (Flageolett) und Unterblasen (Paukentöne), nur mit Klappengeräuschen, große dynamische Bandbreite etc.</p>
            <p><b>Kombinationen:</b> Hoher Verschmelzungsgrad mit der Flöte (Klangverstärkung durch Oktavspiel), Koppelungen auch mit den anderen Holzbläsern möglich: Piccoloflöte, Klarinette und Fagott z.B. in G. Rossini, Ouverture »Die diebische Elster« (La Gazza Ladra), Buchstabe D. Piccoloflöte und Trommel bilden ein traditionelles Instrumentenpaar für militärisches Kolorit.</p>
            <p><b>Literaturbeispiele für eine solistische Piccoloflöte im Orchestersatz:</b></p>
            <ul>
              <li>Cl. Debussy, Ibéria (insbesondere Ziffer 33, T. 1-6)</li>
              <li>D. Schostakowitsch, Sinfonie Nr. 6, 2. Satz</li>
              <li>I. Stravinsky, Petruschka, &raquo;Russian Dance&laquo;</li>
            </ul>
        </div>)
        : null}
    </div>);
}

PiccoloFlute.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

PiccoloFlute.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
