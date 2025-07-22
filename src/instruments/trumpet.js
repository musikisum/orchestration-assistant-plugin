/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Overtones from '../images/overtones.js';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function Trumpet({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(18, 36, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-brass' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Trompete
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p>Die Trompete ist ein Blasinstrument aus Metall aus der Familie der Blechblasinstrumente (als Natur- oder Ventiltrompete).</p>
            <p><b>Tonumfang:</b> Naturtrompeten können nur einen begrenzten Tonvorrat produzieren (Naturtöne).</p>
            <div className='svg-container'>
              <Overtones />
            </div>
            <p>Komponisten haben im 18. Jahrhundert diesen speziellen Tonvorrat berücksichtigt, die markierten (+) Töne sind unrein, Töne unter dem dritten und über dem 12. Oberton wurden selten verwendet. Darüber konnten ab ca. 1850 benötigte und nicht in der Obertonreihe vorhandene Töne durch sogenanntes &raquo;Stopfen&laquo; mit einer anderen Klangqualität gespielt werden. Selbst im 19. Jahrhundert, in dem sich das Ventilhorn bereits durchgesetzt hatte, wurden gelegentlich noch Melodien komponiert, die auf den Tonvorrat der Naturinstrumente zugeschnitten waren, wie z.B. die berühmte Hornmelodie im vierten Satz der 1. Sinfonie von J. Brahms.</p>
            <p><b>Notation:</b> transponierend (mit Ausnahme des Naturhorns in hoch C bzw. altus). Im 18. Jahrundert gab es für die gängigen Grundtonarten von Kompositionen entsprechende Stimmungen:</p>
            <ul>
              <li>Trompete in C (klingend)</li>
              <li>Trompete in D (aufwärts transponierend)</li>
              <li>Trompete in Es (aufwärts transponierend)</li>
              <li>Trompete in E (aufwärts transponierend)</li>
              <li>Trompete in F (aufwärts transponierend)</li>
              <li>Trompete in G (aufwärts transponierend)</li>
              <li>Trompete in H (abwärts transponierend)</li>
              <li>Trompete in B (abwärts transponierend)</li>
              <li>Trompete in A (abwärts transponierend)</li>
            </ul>
            <p>Die Ventiltrompete (Trompete in B) ist dem gegenüber ein chromatisches Instrument mit verengter Mensur und einer um etwa die Hälfte verkürzten Rohrlänge. Ihr Klang ist heller und spitzer bzw. etwas greller als der Klang der Naturtrompete. Es werden zwei Bauweisen unterschieden: Instrumente mit Perinét-Ventilen (&raquo;Jazztrompete&laquo;) oder mit Zylinderventilen.<br />Durch das Wiederaufleben der Trompete als Soloinstrument des Barock nach 1950 wurde die Piccolo-Trompete entwickelt. Sie ist in hoch A oder B gestimmt (aufwärts transponierend), die Rohrlänge ist auf ca. die Hälfte der Rohrlänge der modernen Ventiltrompete gekürzt. Die Piccolo-Trompete wird nicht nur als Soloinstrument, sondern gelegentlich auch im Orchester genutzt, um hohe Passagen sicherer auszuführen. Durch die enge Mensur hat die Piccolo-Trompete einen noch helleren (bzw. brillianteren) Klang. In moderner Bauweise gibt es darüber hinaus noch Trompeten in hoch G (aufwärts transponierend).</p>
            <p><b>Stimmumfänge: </b>Für Naturtrompeten ist im klassischen Orchestersatz ein notierter Umfang von g-g<sup>2</sup> charakteristisch. Daraus ergibt sich für die Trompete in B ein klingender Umfang von f-f<sup>2</sup>, für die Trompete in D ein klingender Umfang von a-a<sup>2</sup>, usw. Moderne Instrumente werden weit höher als bis zum notierten g<sup>2</sup> geführt. Im Jazz sind je nach spieltechnischem Vermögen sogar Töne weit über c<sup>3</sup> gebräuchlich (bis f<sup>3</sup>, solistisch in Einzelfällen sogar bis c<sup>4</sup>).</p>  
            <p><b>Spielweisen:</b> mit div. Artikulationsmöglichkeiten (verschiedene Konsonanten beim Anblasen), Zungentechnik (Doppel-, Tripel- und Flatterzunge), Vibrato, Legato, gestopft (heute nicht mehr üblich) und mit Dämpfer, versch. Triller (über Ventile oder Lippen), Schmettertöne (eingestrichene Oktave), Glissando, etc.</p>
            <p><b>Kombinationen:</b> Kann mit dem Horn im Unisono (Klangverstärkung) und in der Unteroktave (Klangmodifizierung, d.h. der Trompetenklang wird weicher) verwendet werden. Trompeten und Posaunen ergeben eine gute, im Forte wuchtige Wirkung. Die Klangverschmelzung mit den Streichern ist dagegen eher gering (Ausnahme: Viola). Dynamische Probleme können bei Kombinationen mit Holzbläsern entstehen (der Trompetenklang lässt sich durch oktavierendes Spiel mit der Bassklarinette oder dem Fagott verstärken). Die Kombination von Trompete und Klarinette im Unisono ist heller als die mit anderen Holzblasinstrumenten.</p>
            <p><b>Literaturbeispiele:</b></p>
            <ul>
              <li>G. Mahler, 5. Sinfonie, 1. Satz, Anfang</li>
              <li>M. Mussorgsky / M. Ravel, Bilder einer Ausstellung  (orch. durch M. Ravel), &raquo;Promenade&laquo; und &raquo;Samuel Goldenberg und Schmuyle&laquo; (mit Dämpfer und Tripelzunge)</li>
              <li>Beatles, &raquo;Penny Lane&laquo;, John Lennon und Paul McCartney, 1967 (Piccolo-Trompete)</li>
            </ul>
        </div>)
        : null}
    </div>);
}

Trumpet.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

Trumpet.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
