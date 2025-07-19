import React from 'react';

const contra = ({ toneName }) => {

  return (
    <div className='octave-info'>
      <p><b><i>Das kontra {toneName[0].toUpperCase()}<sub>1</sub> liegt in der Kontraoktave.</i></b></p>
      <h1>Die Kontraoktave</h1>
      <p>
        Töne in der Kontraoktave können im Orchester nur noch von den ausgesprochenen Bassinstrumenten gespielt werden: 
      </p>
      <ul>
        <li>Kontrabass,</li>
        <li>Kontrafagott und</li>
        <li>Tuba</li>
      </ul>
      <p>
        Für den viersaitigen <b>Kontrabass</b> ist die große Oktave nur noch eingeschränkt spielbar (tiefster Ton = leere E<sub>1</sub>-Saite). Die <b>Tuba</b> kann als tiefsten Ton das D<sub>1</sub> erzeugen, für das <b>Kontrafagott</b> sind alle Töne der Kontraoktave noch spielbar.
      </p>
      <p>
        Für den Orchesterklang ist die Kontraoktave bis auf die beschriebenen Ausnahmen nicht charakteristisch.
      </p>
    </div>
  );
};

export default contra;