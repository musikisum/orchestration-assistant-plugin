/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function Clarinet({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(17, 40, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-wood' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Klarinette
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p>Die Klarinette ist ein Längsblasinstrument aus Holz mit einfachem Rohrblatt in den folgenden Stimmungen:</p>
            <ul>
              <li>Klarinette in B</li>
              <li>Klarinette in A</li>
              <li>Klarinette in C</li>
              <li>Bassetthorn in F</li>
              <li>Bassklarinette in B</li>
            </ul>
            <p>Selten auch kleine Klarinetten (piccolo) z.B. in D und Es, die Mediumklarinette in G, Altklarinetten in F und Es sowie diverse Kontra-Klarinetten.</p>
            <p><b>Tonumfänge:</b> Die hohen Klarinetten haben den gleichen notierten Stimmumfang von e-a<sup>3</sup>, der klingende Umfang einer Klarinette in B umfasst demnach d-g<sup>3</sup>, der einer Klarinette in A cis-fis<sup>3</sup> usw.</p>
            <p><b>Notation:</b> transponierend, d.h. die Klarinette in B wird einen Ganzton, die Klarinette in A eine kleine Terz, das Bassetthorn eine Quinte (vgl. Horn in F) und die Bassklarinette eine große None höher als klingend notiert</p>
            <p><b>Klangfarbe:</b> im untersten Register schwach (aber voll), in der 1-2-gestrichenen Oktave weich und mit wenig Kraft, in der 2-3-gestrichenen Oktave klar und brilliant, im höchsten Register zunehmend schriller</p>  
            <p><b>Spielweisen:</b> Die Klarinette überbläst in der Duodezime (Oktave + Quinte). Größte dynamische Bandbreite (vom leisesten pianissimo bis zum kraftvollen forte), crescendo &raquo;aus dem Nichts&laquo; (niente attack) bis zum piano und wieder decrescendo, Legato, Staccato, Doppel-, Tripel- und Flatterzunge (nicht in zu hoher Lage) möglich, Zungenschlag gegen das Rohrblatt (mit Tonhöhe, »slap tongue«), geschliffene Töne und Glissando (schwer zwischen gis<sup>1</sup>-a<sup>1</sup>), Effekte durch Zähne am Rohrblatt, Tremolo und Triller, Flageolett, zum Teil Mikrotöne, etc.</p>
            <p><b>Kombinationen:</b> Mit allen Holzbläsern ergeben sich durch Koppelungen im Unisono und in der Oktave gute Klangverbindungen. Im höheren Register leuchtende Wirkung beim Unisonospiel mit der Trompete, schlechte Klangmischung dagegen mit den Posaunen. Klangverschmelzung mit dem Horn im Unisono, effektvoll auch die Kombination Klarinette - Horn in der Oktave bzw. Doppeloktave. Darüber hinaus sind alle Kombinationen mit den Streichern sehr gut möglich.</p>
            <p><b>Literaturbeispiele:</b></p>
            <ul>
              <li>J. S. Bach, Kantate BWV 8 &raquo;Liebster Gott...&laquo;, Arie Nr. 2 &raquo;Was willst du dich...&laquo; (Oboe d&apos;amore)</li>
              <li>W. A. Mozart, Sinfonie in Es, KV 543, 3. Satz, Trio (Klarinetten in B)</li>
              <li>A. Schönberg, Pierrot Lunaire Op. 21, 9. &raquo;Gebet an Pierrot&laquo; (Klarinette in A)</li>
              <li>W. A. Mozart, Requiem, &raquo;Recordare&laquo; (Bassetthörner)</li>
            </ul>
        </div>)
        : null}
    </div>);
}

Clarinet.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

Clarinet.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
