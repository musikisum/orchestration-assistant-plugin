/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js';

export default function Piano({ from, to, row }) {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  const [begin, end] = OrchestrationUtilities.calculateGridColumnsForInstruments(1, 50, from, to); 
  const calculation = `${begin}/${end}`;

  return (
    <div className='instrument instrument-strings' style={{ gridColumn: calculation, gridRow: row }}>
      <div className='instrument-beam' onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Tasteninstrumente (Flügel, Orgel, Cembalo, Celesta)
      </div>
      {isVisible
        ? (
        <div className="instrument-annotations">
            <p>Tasteninstrumente (von lat. claves = Taste) gibt es in unterschiedlichen Bauweisen, z.B. als:</p>
            <ul>
              <li>Pianoforte (Piano, Flügel; umgangssprachlich das Klavier/Piano im engeren Sinne), Instrument mit Stimmumfang von über 7 Oktaven (A<sub>2</sub>-c<sup>5</sup>, abhängig von der Bauweise)</li>
              <li>Orgel, als modernes Instrument mit größtem Umfang (C-c<sup>4</sup>, durch 32-Fuß- und 2-Fuß-Register können der Umfang um jeweils eine bzw. zwei Oktaven erweitert werden)</li>
              <li>Cembalo, Tonumfänge je nach Bauart verschieden, moderne Instrumente von F<sub>1</sub>-c<sup>3</sup>, durch 16-Fuß- und 4-Fuß-Register erweiterbar um jeweils eine Oktave. Klang: gerissene Saite (mit Mechanikgeräusch)</li>
              <li>Celesta, oberschlägige Hammermechanik (auf Stahlplatten und hölzernen Resonatoren), langer Nachhall kann durch Pedaltritt gedämpft werden, mit einem Tonumfang von c-c<sup>4</sup>. Klang: zarter Ton mit einer dem Glockenspiel bzw. der Glasharmonika ähnlicher Klangfarbe.</li>
            </ul>
            <p><b>Notation:</b> Celesta: eine Oktave höher als klingend (transponierendes Instrument, vgl. Kontrabass und Bassgitarre), übrige Klavierinstrumente: klingend, mit Registervorzeichnung oktavierend (in der Okatve bzw. Doppeloktave)</p>
            <p>Die Celesta ist das häufigste Klavierinstrument im Orchester.</p>
            <p><b>Literaturbeispiele:</b></p>
            <ul>
              <li>I. Stravinsky, Psalmensinfonie (m. Klavier)</li>
              <li>B. Bartók, Musik für Saiteninstrumente, Schlagzeug und Celesta</li>
              <li>Chris de Burgh, Crusader (m. Cembalo)</li>
              <li>Emerson, Lake & Palmer, Pictures At An Exhibition (m. Orgel, Synthesizer)</li>
            </ul>
        </div>)
        : null}
    </div>);
}

Piano.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  row: PropTypes.number
};

Piano.defaultProps = {
  from: 1,
  to: 50,
  row: null
};
