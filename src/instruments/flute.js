/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function Flute({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(22, 45, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-brass' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Flöte
      </div>
      {isVisible
        ? (
        <div className="instrument instrument-annotations">
            <p>Die Querflöte (obwohl aus Metall und ohne Rohrblatt) zählt zu den Holzblasinstrumenten (historische Instrumente in Holzbauweise).</p>
            <p><b>Tonumfang;</b> (h) c<sup>1</sup>-c<sup>4</sup> (je nach technischem Vermögen auch d<sup>4</sup>-f<sup>4</sup>), darüber hinaus werden gelegentlich auch eine Alt-Flöte in G (von g-g<sup>3</sup>) sowie Bass-Flöte (von c-c<sup>3</sup>) gefordert</p>
            <p><b>Notation:</b> klingend (große Flöte), transponierend (Alt-Flöte in die Unterquart bzw. Bassflöte in die Unteroktave)</p>
            <p><b>Klangfarbe:</b> im untersten Register schwach (aber voll), in der 1-2-gestrichenen Oktave weich und mit wenig Kraft, in der 2-3-gestrichenen Oktave klar und brilliant, im höchsten Register zunehmend schriller</p>      
            <p><b>Spielweisen:</b> mit und ohne Vibrato, gebunden (legato), gestoßen (staccato), Flatterzunge, Gutturaltöne (gleichzeitig mit notierten Tönen), mit viel Luft (sibilando, sputato), glissandoartiges Ansetzen der Töne, Whistle-Ton (entspannter Ansatz und geringster Luftsstrom: es erklingen harmonische Obertöne), Überblasen (Flageolett) und Unterblasen (Paukentöne), nur mit Klappengeräuschen, große dynamische Bandbreite etc.</p>
            <p><b>Kombinationen:</b> Gute Klangmischung mit Oboe und Klarinette. Kombination zwischen Flöte und Fagott ergibt im Doppeloktavabstand eigentümliche Klangwirkung, mit den Blechbläsern sind Kombinationen aufgrund der dynamischen Unterschiede schwierig, Ausnahme: Flöte und Horn sowie im Piano und tieferen Register Flöte und Trompete. Mit den Streichern besteht hohe Klangverschmelzung, in der Oberoktave zu den Violinen tritt die Flöte eher als Soloinstrument hervor, im Unisono dominiert der Violinklang.</p>
            <p><b>Literaturbeispiele für einen solistischen Kontrabass im Orchestersatz:</b></p>
            <ul>
              <li>J. S. Bach, Orchestersuite in h-Moll, BWV 1067, <i>Double</i> und <i>Badinerie</i></li>
              <li>Cl. Debussy, Prélude à l&apos;après-midi d&apos;un faune</li>
              <li>A. Schönberg, Pierrot Lunaire Op. 21, 7. &raquo;Der kranke Mond&laquo;</li>
              <li>Jethro Tull, Bourée</li>
            </ul>
        </div>)
        : null}
    </div>);
}

Flute.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

Flute.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
