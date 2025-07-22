/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function AltoSaxophone({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(17, 34, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-brass' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Altsaxofon in Es
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p>Das Altsaxofon ist ein Instrument aus der Saxofonfamilie. Dazu gehören:</p>
            <ul>
              <li>Sopranino in Es</li>
              <li>Sopransaxophon in B</li>
              <li>Altsaxophon in Es</li>
              <li>Tenorsaxophon in B</li>
              <li>Baritonsaxophon in Es</li>
              <li>Basssaxophon in B</li>
            </ul> 
            <p><b>Stimmumfänge:</b> Alle Saxophone haben einen notierten Umfang von b-fis<sup>3</sup>. Daraus ergibt sich für das Sopranino ein klingender Umfang von des<sup>1</sup>-<sup>3</sup>, für das Sopransaxophon von as-e<sup>3</sup>, für das Altsaxophon von des-a<sup>2</sup>, für das Tenorsaxophon von As-e<sup>2</sup>, für das Baritonsaxophon von Des-a<sup>1</sup> und für das Basssaxophon von As<sup>1</sup>-e<sup>1</sup>. Töne über der angegebenen oberen Ambitusgrenze zählen zum Flageolett.</p> 
            <p><b>Notation:</b> transponierend, d.h. eine kleine Terz höher als klingend (Sopranino), eine große Sekunde, große None bzw. große Sekunde und zwei Oktaven tiefer als klingend (Sopran-, Tenor- und Basssaxophon) sowie eine große Sexte bzw. eine große Sexte und Oktave tiefer als klingend (Alt- und Baritonsaxophon)</p>
            <p><b>Spielweisen:</b> Legato (gebunden), gestoßen (staccato), Triller, Vibrato, Growling, Klappeneffekte und False fingerings, Flatterzunge, Slaptongue, Glissando (Bending), Überblasen (Oktave und Duodezime) sowie Unterblasen (mit viel Luft, Luft ohne Ton), Subtone, etc., hohe Beweglichkeit</p>
            <p><b>Besonderheiten:</b> Vier bis fünfstimmige Sätze (»reed section«), z.B. &raquo;Four-Brothers-Klang&laquo; (3 Tenorsaxophone und ein Baritonsaxophon, bekannt seit 1948 durch das Orchester von Woody Herman) in der klassischen Moderne (Strawinsky, Gershwin, Berg, Webern u.a.) sowie in der populären Musik (Miller, Ellington u.a.). Der fünfstimmige Satz (bekannt geworden durch Benny Carter) kann als Standardbesetzung der Big-Band (2 Altsax., 2 Tenorsax., 1 Baritonsax) bezeichnet werden.</p>
            <p><b>Literaturbeispiel:</b></p>
            <ul>
              <li>M. Ravel, Boléro, (nach Ziffer 7: Sopranino in F und Sopran in B)</li>
              <li>D. Milhaud, Suite &raquo;scaramouche&laquo;</li>
              <li>M. Mussorgsky / M. Ravel, Bilder einer Ausstellung, instrumentierte Fassung, 2. Il Vecchio Castello (Altsaxophon)</li>
              <li>A. K. Glasunow, Saxophonkonzert in Es-Dur Op. 109</li>
            </ul>
        </div>)
        : null}
    </div>);
}

AltoSaxophone.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

AltoSaxophone.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
