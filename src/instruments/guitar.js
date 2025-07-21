/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function Guitar({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(10, 38, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-strings' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Gitarre
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
          <p>Die Gitarre iszt ein Saiteninstrument mit Bünden.</p>
            <p><b>Stimmung:</b> E-A-d-g-h-e<sup>1</sup></p>
            <p><b>Notation:</b> eine Oktave höher als klingend (transponierendes Instrument), hohe Beweglichkeit</p>
            <p><b>Tonumfänge:</b> bis e<sup>2</sup> mit allen Gitarrentypen möglich, Gitarren mit 19 Bünden in der Höhe bis h<sup>2</sup>, elektrische Gitarren mit »Cutaway« (Einbuchtung im Korpus) sogar bis e<sup>3</sup></p>
            <p><b>Bauweise:</b> 
              Akustische Gitarren haben einen Resonanzkörper (Konzertgitarre, Western-Gitarre) und können für  das Spiel in der Band mit Tonabnehmern (pick ups) verstärkt werden. In der Gruppe der elektrischen Gitarren unterscheidet man zwischen Vollresonanz-, Halbresonanz- und Solidbody-Gitarren. Die Vollresonanz-Gitarre ist der älteste E-Gitarrentyp mit Resonanzkörper, F-Schallöchern, eingebauten Tonabnehmern und wird heute beinahe ausschließlich im Jazz verwendet.<br />
              Die Halbresonanz-Gitarre ist ein Bindeglied zwischen akustischer und elektrischer Gitarre, zur Verbesserung der Rückkoppelungseigenschaften wird seit 1955 in den hohlen Korpus ein massives Mittelsegment eingelassen. Die Bauweise heutiger elektrischer Gitarren lässt sich auf wenige Modelle zurückführen (von Gibson: ES-150, »Les Paul«, ES-335 sowie »Firebird« sowie von Fender: Telecaster und Stratocaster).
            </p>      
            <p>
              <b>Spielweisen:</b> Diverse Zupftechniken, Bottleneck-Spielweise (mit einem Glas- oder Metallröhrchen am Finger, das über die Saiten gleitet), Stringbending (Tonhöhenveränderung durch Ziehen an der Saite), Hammer-on und Pull-off (fließender Übergang zwischen Tönen ohne erneutes Anschlagen), Sustain (langes Aushalten von Tönen, z.B. durch Verstärkung), sowie bei elektronischer Verstärkung zusätzliche Effekte wie Flanger, Chorus, Delay (Echo), Reverb (Hall), Pitch Shifter (Tonhöhenveränderung), Phaser (phasenverschobener Effekt), Overdrive/Distortion (Verzerrung), Whammy Bar (Vibratohebel) und Wah-Wah-Pedal (Filter zur Erzeugung vokalähnlicher Klangverläufe) etc.
            </p>
            <p><b>Literaturbeispiele für die Klangmöglichkeiten einer elektrischen Gitarre:</b></p>
            <ul>
              <li>Jimi Hendrix, Star Spangled Banner</li>
              <li>Santana, Samba PaTi</li>
              <li>Van Halen, Jump</li>
            </ul>
        </div>
        )
        : null}
    </div>
  );
}

Guitar.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

Guitar.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
