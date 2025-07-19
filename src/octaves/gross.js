import React from 'react';

const gross = ({ toneName }) => {

  return (
    <div>
      <p><b><i>Das große {toneName[0].toUpperCase()} liegt in der großen Oktave.</i></b></p>
      <h1>Die große Oktave</h1>
      <p>
        Töne in der großen Oktave können im Orchester gespielt werden von
      </p>
      <ul>
        <li>Cello,</li>
        <li>Kontrabass,</li>
        <li>Fagott,</li>
        <li>von der Posaune und</li>
        <li>der Tuba.</li>
      </ul>
      <p>
        Für die Celli liegt in der großen Oktave das tiefste Register (tiefster Ton = leere C-Saite), für die Kontrabässe ist die große Oktave eine gebrächliche Lage (notiert als kleine Oktave).
      </p>
      <p>
        Die große Oktave ist für das Fagott eine tiefe Lage, mit vollen, kräftigigen und tragfähigen Tönen. Leise gespielt können Töne des Fagotts in dieser Lage dunkel und geheimnisvoll klingen, vgl. P. Tschaikowsky, Sinfonie Nr. 6 in h-Moll, 1. Satz, Anfang.
      </p>
      <p>
        Von den Saxophonen können alle Töne der großen Oktave nur noch das Bariton- und Basssaxophon spielen.
      </p>
      <p>
        Das moderne Horn hat in der großen Oktave sein tiefstes Register, Ventilhörner konnten in dieser Lage allerdings früher nur wenige Töne spielen (vgl. Obertonreihe bzw. Spielweise der Hörner).
      </p>
      <p>
        Töne der großen Oktave sind für die Tenorposaune nur noch eingeschränkt spielbar (tiefster Ton = e, mit Ausnahme der auf dem Tenorinstrument schwer zu spielenden tiefen »Pedaltöne«). In ihrem tiefsten Register klingt die Posaune dunkel und weniger stark.
      </p>
      <p>
        Die große Oktave ist ein typisches Bassregister für die Bassklarinette und die Tuba.
      </p>
      <p>
        Für die folgenden Instrumente sind die Töne der großen Oktave nicht oder überwiegend nicht spielbar:
      </p>
      <ul>
        <li>Piccoloflöte (und Blockflöte)</li>
        <li>Flöte</li>
        <li>Oboe</li>
        <li>Klarinette</li>
        <li>Englischhorn</li>
        <li>Sopran- und Altsaxophon</li>
        <li>Trompete</li>
      </ul>
    </div>
  );
};

export default gross;