import React from 'react';
import orchUtils from '../orchestration-utilities.js';

const contra = ({ toneName }) => {

  const octave = orchUtils.getOctaveName(toneName);
  const upper = octave.charAt(0).toUpperCase() + octave.slice(1);

  return (
    <div>
      <p><b><i>Das {octave} {toneName[0]} liegt in der {upper}oktave.</i></b></p>
      <h1>Die Kontraoktave</h1>
      <p>
        Töne in der Kontraoktavektave können im Orchester nur noch von den ausgesprochenen Bassinstrumenten wie 
      </p>
      <ul>
        <li>Kontrabass,</li>
        <li>Kontrafagott und</li>
        <li>Tuba</li>
      </ul>
      <p>
        gespielt werden. Für die viersaitigen Kontrabässe ist die große Oktave nur noch eingeschränkt spielbar (tiefster Ton = leere E<sub>1</sub>-Saite). Die Tuba kann als tiefsten Ton das D1 erzeugen, für das Kontrafagott sind alle Töne der Kontraoktave noch spielbar.
      </p>
      <p>
        Für den Orchesterklang ist die Kontraoktave bis auf die beschriebenen Ausnahmen nicht charakteristisch.
      </p>
    </div>
  );
};

export default contra;