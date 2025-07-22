/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function Trombone({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(10, 28, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-brass' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Posaune
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p>Die Posaune ist ein Instrument aus Metall aus der Familie der Blechblasinstrumente. Instrumente der Posaunenfamilie werden in verschiedenen Lagen gebaut:</p>
            <ul>
              <li>Altposaune</li>
              <li>Tenorposaune</li>
              <li>Bassposaune</li>
              <li>Kontrabassposaune (z.B. bei Wagner)</li>
            </ul> 
            <p><b>Stimmumfänge:</b> Die Altposaune von A-es<sup>2</sup>, die Tenorposaune von E-d<sup>2</sup> (f<sup>2</sup>) und die Bassposaune von B<sub>1</sub>-f<sup>1</sup>, dazu jeweils 7 sog. Pedaltöne (Grundtöne der Zugpositionen, früher wegen schwerer Ansprache nur selten gefordert, heute dagegen gebräuchlich und auf modernen Instrumenten auch leichter realisierbar). Der Tonumfang in der Höhe ist stark abhängig vom Spielvermögen.</p> 
            <p><b>Notation:</b> Trotz verschiedener Grundstimmungen werden Posaunen klingend notiert (im Bassschlüssel, höhere Lagen auch im Tenorschlüssel).</p>
            <p><b>Spielweisen:</b> Mit div. Artikulationsmöglichkeiten (verschiedene Konsonanten beim Anblasen), Zungentechnik (Doppel-, Tripel und Flatterzunge), Vibrato, Legato, mit Dämpfer, Triller (Lippentriller), Glissando (bis max. zum Umfang einer verminderten Quinte), etc. Aufgrund des Zugsystems geringere Beweglichkeit</p>
            <p><b>Klangfarbe:</b> Pedaltöne haben einen metallischen, dunklen und engen Klang; im tiefen Register wirken Posaunen gewichtig, dunkel, im Forte bedrohlich; im mittleren Register heroisch und mit enormer Klangkraft, voll und ernsthaft im Piano; im hohen Register nimmt die Weichheit zu (in dieser Lage Klangänlichkeit zum Horn).</p>
            <p><b>Kombinationen: </b>Mit allen Blechbläsern ergeben sich sehr gute Klangverbindungen. Trotz klanglicher Differenzen wird als Bassinstrument des Posaunensatzes die Tuba verwendet. Kombinationen mit den Holzbläsern sind weniger gut möglich (kaum Verschmelzungen), die Posaune kann mit den tiefen Holzbläsern im Forte (tutti) zur Klangverstärkung kombiniert werden. In Verbindung mit den Streichern sind sehr homogene Klangwirkungen möglich.</p>
            <p><b>Literaturbeispiele:</b></p>
            <ul>
              <li>W. A. Mozart, Requiem, Tuba mirum, Anfang</li>
              <li>G. Rossini, Ouverture zu Wilhelm Tell, Buchstabe C (T. 92ff.)</li>
              <li>P. Tschaikowsky, Sinfonie Nr. 6 in h-Moll, 1. Satz, Ziffer 16</li>
            </ul>
        </div>)
        : null}
    </div>);
}

Trombone.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

Trombone.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
