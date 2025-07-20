/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function Oboe({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(21, 40, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-wood' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Oboe
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p>Die Oboe ist ein Längsblasinstrument aus Holz mit Doppelrohrblatt in den folgenden Stimmlagen:.</p>
            <ul>
              <li>Oboe (Sopran), Stimmumfang: b-g<sup>3</sup> (a<sup>3</sup>, in neuerer Musik auch höher)</li>
              <li>Oboe d&apos;amore in A (Mezzosopran bzw. Alt), Stimmumfang: gis-cis<sup>3</sup></li>
              <li>Englischhorn in F und Oboe da caccia in F (Tenor bzw. Alt), Stimmumfang: (es) e-b<sup>2</sup> (c<sup>3</sup>)</li>
              <li>Bariton- bzw. Bassoboe, Heckelphon (Tenor bzw. Bass), Stimmumfang: (A) B-e<sup>2</sup></li>
            </ul>
            <p>Da Bariton- und Bassoboe nur selten in Orchestern verfügbar sind, wird auch das Fagott als Bassinstrument der Oboenfamilie bezeichnet bzw. eingesetzt.</p>
            <p><b>Notation:</b>  klingend (Oboe) und transponierend: Oboe d&apos;amore eine kleine Terz höher als klingend (vgl. Klarinette in A), Englischhorn eine Quinte höher als klingend (vgl. Horn in F), Bassoboe und Heckelphon oktavierend (eine Oktave höher als klingend, vgl. z.B. Kontrabass)</p>
            <p><b>Klangfarbe:</b> im untersten Register schwach (aber voll), in der 1-2-gestrichenen Oktave weich und mit wenig Kraft, in der 2-3-gestrichenen Oktave klar und brilliant, im höchsten Register zunehmend schriller</p>  
            <p><b>Spielweisen:</b> eingeschränktes Vibrato (bis zur großen Sekunde mit dem Zwerchfell), gebunden (legato), gestoßen (staccato), Tripelzunge (nur bedingt), Fingerglissando (eingeschränkt), glissandoartiges Ansetzen der Töne (Lippenglissando bis zur großen Sekunde), Triller, Flageolett und bedingt Doppelflageolett (gespielter Ton und Flageolettton erklingen gleichzeitig), Mikrotöne etc. Geringere Beweglichkeit als die Flöteninstrumente</p>
            <p><b>Kombinationen:</b> Mit allen Holzbläsern sehr gut möglich. Kombinationen zu den Blechbläsern sind in der Oberoktave zu Trompete und Horn üblich, ansonsten aufgrund der dynamischen Balance schwierig und eher unüblich, sehr gute und gebräuchliche Kombinationen ergeben sich auch zu den Streichern (z.B. unisono zu den Violinen oder in Oktaven zu den Celli).</p>
            <p><b>Literaturbeispiele:</b></p>
            <ul>
              <li>J. S. Bach, Kantate BWV 8 &raquo;Liebster Gott...&laquo;, Arie Nr. 2 &raquo;Was willst du dich...&laquo; (Oboe d&apos;amore)</li>
              <li>P. Tschaikowsky, Sinfonie Nr. 4 in f-Moll, Op. 36, 2. Satz (Oboe)</li>
              <li>J. Brahms, Violinkonzert in D-Dur, Op. 77, 2. Satz (Oboe)</li>
              <li>I. Stravinsky, Pulcinella-Suite nach Pergolesi, 2. Satz, Serenata (Oboe)</li>
              <li>J. S. Bach, Weihnachtsoratorium, Eingangssatz zum 2. Teil, Sinfonia (vierstimmiger Oboensatz mit zwei Oboen d&apos;amore und zwei Oboen da caccia)</li>
              <li>Repertoirestellen zum Englischhorn s. unter Englischhorn</li>
            </ul>
        </div>)
        : null}
    </div>);
}

Oboe.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

Oboe.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
