import React from 'react';

const small = ({ toneName }) => {

  return (
    <div>
      <p><b><i>Das kleine {toneName[0]} liegt in der kleinen Oktave.</i></b></p>
      <h1>Die kleine Oktave</h1>
      <p>
        Töne in der kleinen Oktave können im Orchester gespielt werden von
      </p>
      <ul>
        <li>Streichern,</li>
        <li>Klarinetten (inklusive Bassklarinette),</li>
        <li>vom Fagott,</li>
        <li>Saxofon,</li>
        <li>Horn,</li>
        <li>von der Posaune und der</li>
        <li>Tuba.</li>
      </ul>
      <p>
        Für die <b>Violinen</b> ist die kleine Oktave nur eingeschränkt spielbar (tiefster Ton = leere G-Saite bzw. das kleine g). Für die <b>Viola</b> ist die kleine Oktave eine tiefe Lage (tiefster Ton der Viola = leere C-Saite bzw. das kleine c), für das <b>Cello</b> eine Mittellage und für den <b>Kontrabass</b> im Orchester eine hohe Lage (denn die in der Notation oft in der kleinen Oktave vorgeschriebenen Noten erklingen eine Oktave tiefer in der großen Oktave!).<br />
        Die <b>Klarinette</b> spielt in der eingestrichenen Oktave in ihrem tiefen, sog. <i>Chalumeau-Register</i>. In diesem Register können Töne unglaublich leise - quasi aus der Stille bzw. »sotto voce« oder »niente attack« - entwickelt werden, ein Effekt, der in dieser Form nur von der Klarinette spielbar und von Komponisten des 20. Jahrhunderts gerne verwendet worden ist.<br />
        Das <b>Englischhorn</b> erklingt in der kleinen Oktave in seinem tiefsten Register (tiefster Ton = e).
        Die kleine Oktave ist für das <b>Fagott</b> eine Mittellage (vgl. J. Haydn, Sinfonie Nr. 101 in D-Dur, 2. Satz; L. v. Beethoven, 4. Sinfonie in B-Dur, 1. Satz, Überleitung T. 65 und Seitensatz T. 107).<br />
        Für das <b>Tenorsaxofon</b> ist die kleine Oktave eine Mittellage, das <b>Altsaxofon</b> eine tiefe Lage (tiefster Ton = das kleine des).<br />
        Das <b>Horn</b> ist in der kleine Oktave klangvoll, mit dunklerer Färbung.<br />
        In der kleinen Oktave kann die <b>Posaune</b> kraftvoll und mit großer Klangentfaltung spielen (vgl. G. Rossini, Ouverture zu Wilhelm Tell, T. 92, Buchstabe C und Schubert, Sinfonie Nr. 8 in C-Dur, 1. Satz, T. 304, Durchführung).<br />
        Für die <b>Bassklarinette</b> ist die kleine Oktave eine Mittellage, für die <b>Tuba</b> zählt die untere Hälfte der kleinen Oktave zum Hauptklangbereich, in der obere Hälfte ist ein Spiel mit zunehmender Klangstärke möglich.<br />
        Die <b>Trompete</b> wird in der kleinen Oktave im klassischen Repertoire in lauten Passagen mit Liegetönen zur Erzeugung von größerer Klangfülle eingesetzt.
      </p>
      <p>
        Für die folgenden Instrumente sind die Töne der kleinen Oktave nicht oder überwiegend nicht spielbar:
      </p>
      <ul>
        <li>Piccoloflöte (und Sopranblockfllöte)</li>
        <li>Flöte</li>
        <li>Oboe</li>
        <li>Sopransaxofon</li>
      </ul>
    </div>
  );
};

export default small;