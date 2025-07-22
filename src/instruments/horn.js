/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Overtones from '../images/overtones.js';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function Horn({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(7, 32, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-brass' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Horn
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p>Das Horn ist ein Blasinstrument aus Metall als Natur- oder Ventilhorn.</p>
            <p><b>Tonumfang:</b> Naturhörner können nur einen begrenzten Tonvorrat produzieren (Naturtöne).</p>
            <div className='svg-container'>
              <Overtones />
            </div>
            <p>Komponisten haben im 18. Jahrhundert diesen speziellen Tonvorrat berücksichtigt, die markierten (+) Töne sind unrein, Töne unter dem dritten und über dem 12. Oberton wurden selten verwendet. Darüber konnten ab ca. 1850 benötigte und nicht in der Obertonreihe vorhandene Töne durch sogenanntes &raquo;Stopfen&laquo; mit einer anderen Klangqualität gespielt werden. Selbst im 19. Jahrhundert, in dem sich das Ventilhorn bereits durchgesetzt hatte, wurden gelegentlich noch Melodien komponiert, die auf den Tonvorrat der Naturinstrumente zugeschnitten waren, wie z.B. die berühmte Hornmelodie im vierten Satz der 1. Sinfonie von J. Brahms.</p>
            <p><b>Notation:</b> transponierend (mit Ausnahme des Naturhorns in hoch C bzw. altus). Im 18. Jahrundert gab es für die gängigen Grundtonarten von Kompositionen entsprechende Stimmungen:</p>
            <ul>
              <li>Horn in B (hoch, tief)</li>
              <li>Horn in C (hoch, tief)</li>
              <li>Horn in A (hoch, tief)</li>
              <li>Horn in G</li>
              <li>Horn in F</li>
              <li>Horn in E</li>
              <li>Horn in Es</li>
              <li>Horn in D</li>
            </ul>
            <p>Ein modernes Ventilhorn (Doppelhorn in F) vereinigt die Möglichkeiten eines Horns in F und hoch B. Über Ventile lässt sich darüber hinaus der chromatische Tonvorrat produzieren.</p>
            <p><b>Stimmumfänge: </b>Alle Naturhörner haben in der Orchesterpraxis einen notierten Umfang von g-g<sup>2</sup>. Daraus ergibt sich für das Horn in B (hoch) ein klingender Umfang von f-f<sup>2</sup>, für das Horn in B (tief) von F-f<sup>1</sup>, für das Horn in F von c-c<sup>2</sup> usw.</p>
            <p><b>Klangfarbe (Ventilhorn in F):</b> von F-c dunkel und ein wenig undeutlich, von c-f warm und kraftvoll, von f-c<sup>2</sup> in der besten solistischen Lage, darüber brilliant, jedoch dünn und durchdringend.</p>  
            <p><b>Spielweisen:</b> mit div. Artikulationsmöglichkeiten (verschiedene Konsonanten beim Anblasen), Zungentechnik (Doppel-, Tripel- und Flatterzunge), Vibrato, Legato, gestopft und mit Dämpfer, Triller, etc.<br />In der Orchesterpraxis werden die hohen Stimmen in der Regel vom 1. und 3. Horn, die tieferen vom 2. und 4. Horn gespielt.</p>
            <p><b>Kombinationen:</b> Der Tubaklang verschmilzt mit dem der Hörner gut. Kombinationen mit anderen Blechblasinstrumenten sind möglich (im Piano mit den Trompeten und Posaunen unproblematisch, zu beachten ist, dass im Forte Hörner nur etwa die halbe Lautstärke der übrigen Blechblasinstrumente  erreichen können). Gute Klangverbindungen bestehen auch mit den Streichern sowie der Oboe, der Klarinette und dem Fagott (hoher Verschmelzungsgrad im Unisono).</p>
            <p><b>Literaturbeispiele:</b></p>
            <ul>
              <li>F. Schubert, Sinfonie in C-Dur (&raquo;Die Große&laquo;), Anfang</li>
              <li>R. Wagner, Siegfried, 1. Akt, 2. Szene</li>
              <li>The Beatles, &raquo;For No One&laquo;, John Lennon und Paul McCartney, 1966</li>
            </ul>
        </div>)
        : null}
    </div>);
}

Horn.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

Horn.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
