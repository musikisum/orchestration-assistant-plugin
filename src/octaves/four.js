import React from 'react';

const four = ({ toneName }) => {

  return (
    <div>
      <p><b><i>Das {toneName[0]}&apos;&apos;&apos;&apos; liegt in der viergestrichenen Oktave.</i></b></p>
      <h1>Die viergestrichene Oktave</h1>
      <p>
        Töne in der viergestrichenen Oktave können im Orchester von gespielt werden von
      </p>
      <ul>
        <li>der Piccoloflöte.</li>
      </ul>
      <p>
        Für die <b>Violinen</b> liegen Töne der viergestrichenen Oktave im höchsten Register und werden im Orchester sehr selten und nur für bestimmte Effekte gefordert (vgl. R. Wagner, Lohengrin, Anfang).<br />
        Der Klang der <b>Piccoloflöte</b> in der viergestrichenen Oktave ist laut und schrill, daher werden Töne in diesem Register üblicher Weise für ein Tutti im <i>forte</i> gefordert.
      </p>
      <p>
        Für den Orchesterklang ist die viergestrichene Oktave bis auf die beschriebenen Ausnahmen nicht charakteristisch.
      </p>
    </div>
  );
};

export default four;