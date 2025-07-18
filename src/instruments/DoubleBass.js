/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function DoubleBass({ from, to }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(4, 30, from, to); 
  const calculation = `${begin}/${end}`;

  const layout = {
    lineHeight: '1.4em',
    fontSize: '0.9em',
    marginBottom: '6px',
    marginTop: 0
  };

  return (
    <div className='instrument-strings' style={{ gridColumn: calculation }}>
      <div onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Kontrabass
      </div>
      {isVisible
        ? <div className="instrument-annotations">
            <p style={layout}><b>Stimmung:</b> E<sub>1</sub>-A<sub>1</sub>-D-G</p>
            <p style={layout}><b>Stimmung (fünf Saiten):</b> H<sup>2</sup> oder C<sub>1</sub>-E<sub>1</sub>-A<sub>1</sub>-D-G</p>
            <p style={layout}><b>Notation:</b> eine Oktave höher als klingend (transponierendes Instrument), Als Orchesterinstrument geringere Beweglichkeit als die hohen Streicher</p>
            <p style={layout}><b>Griffbrettgrenze:</b> G-Saite = h<sup>1</sup>, im Orchester Umfang bis ... gut möglich</p>
            <p style={layout}><b>Doppelgriffe:</b> eingeschränkt möglich, im Orchesterspiel unüblich</p>
            <p style={layout}><b>Flageolett:</b> Groß- und Kleinterzflageolett (mit Daumenaufsatz), ab der 7./8. Lage auch Quartflageolett möglich. In der Orchesterpraxis wird vorgeschriebenes natürliches Flageolett auf der tiefsten Saite in der Regel nicht gespielt, sondern auf einer höheren Saite gegriffen (»spricht zu schwer an«)</p>        
            <p style={layout}><b>Spielweisen:</b> liegend (détaché), gebunden (legato), nicht gebunden (von non legato bis staccato), akzentuiert (martelé), Bogen hüpfend (spiccato), auf die Saite fallend (ricochet), über dem Griffbrett (flautando), mit der Bogenstange schlagend (col legno), mit der rechten (im Solospiel auch mit der linken Hand) gezupft (pizzicato), glissando (geschliffen), Vibrato / non Vibrato, mit Dämpfer</p>
            <p style={layout}><b>Basis-Positionen der Finger 1–4:</b> Große Sekunde, ab der 7. Lage = kleine Terz</p>
            <p style={layout}><b>Kombinationen:</b> Die Koppelung mit den Celli (klingend im Oktavabstand) ist im Orchester der Normalfall. Gute Effekte ergeben sich mit der Bassklarinette und dem Kontrafagott sowie im oktavierenden Spiel mit Hörnern und Posaunen. Die Koppelung mit der Tuba ist im Unisonospiel gut möglich.</p>
            <p style={layout}><b>Schulorhester:</b> Umfang bis zum d<sup>1</sup> (e<sup>1</sup>) nicht überschreiten, schnellere Bewegung nur als Tonwiederholungen fordern.</p>
            <p style={layout}><b>Literaturbeispiele für einen solistischen Kontrabass im Orchestersatz:</b></p>
            <ul style={layout}>
              <li>J. Haydn, Sinfonie Nr. 6 (Hob.I:6), »Le Matin«, 3. Satz</li>
              <li>C. Saint-Saëns, Karneval der Tiere, »Der Elephant«</li>
              <li>G. Verdi, Otello, 4. Akt, Anfang</li>
            </ul>
          </div>
        : null}
    </div>);
}

DoubleBass.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number
};

DoubleBass.defaultProps = {
  from: 1,
  to: 50
};
