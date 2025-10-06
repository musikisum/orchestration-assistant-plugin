import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Markdown from '@educandu/educandu/components/markdown.js';

export default function Contra({ toneName }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  const de = `***Das Kontra-${toneName[0].toUpperCase()} liegt in der Kontraoktave (${toneName[0].toUpperCase()}₁).***  

# Die Kontraoktave

Töne in der Kontraoktave können im Orchester nur noch von den ausgesprochenen Bassinstrumenten gespielt werden:

- Kontrabass  
- Kontrafagott  
- Tuba  

Für den viersaitigen **Kontrabass** ist die Kontraoktave nur eingeschränkt spielbar (tiefster Ton = leere E₁-Saite).

Die **Tuba** kann als tiefsten Ton das D₁ erzeugen.

Für das **Kontrafagott** sind alle Töne der Kontraoktave noch spielbar.  

Für den Orchesterklang ist die Kontraoktave bis auf die beschriebenen Ausnahmen nicht charakteristisch.
`;

  const en = `***The note ${toneName[0].toUpperCase()}1 is placed in the 1st octave***  

# The first Octave

Notes in the first octave can be played in the orchestra only by the true bass instruments:

- Double bass  
- Contrabassoon  
- Tuba  

For the four-string **double bass**, the first octave is only partly playable (lowest note = open E₁ string).

The **tuba** can produce D₁ as its lowest note.

For the **contrabassoon**, all notes of the first octave are playable.  

For the orchestral sound, the first octave is not characteristic apart from these exceptions.
`;

  return (
    <Markdown className='instrumentDescription' renderAnchors>{t('language') === 'de' ? de : en}</Markdown>
  );
};

Contra.propTypes = {
  toneName: PropTypes.string
};

Contra.defaultProps = {
  toneName: ''
};
