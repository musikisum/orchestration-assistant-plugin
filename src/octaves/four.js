import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Markdown from '@educandu/educandu/components/markdown.js';

export default function Four({ toneName }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  
  const de = `***Das ${toneName[0]}'''' liegt in der viergestrichenen Oktave (${toneName[0]}⁴).***

# Die viergestrichene Oktave

Töne in der viergestrichenen Oktave können im Orchester gespielt werden von:

- der Piccoloflöte  

Für die **Violinen** liegen Töne der viergestrichenen Oktave im höchsten Register und werden im Orchester sehr selten und nur für bestimmte Effekte gefordert (vgl. R. Wagner, *Lohengrin*, Anfang).

Der Klang der **Piccoloflöte** in der viergestrichenen Oktave ist laut und schrill, daher werden Töne in diesem Register üblicherweise für ein Tutti im *forte* gefordert.

Für den Orchesterklang ist die viergestrichene Oktave bis auf die beschriebenen Ausnahmen nicht charakteristisch.
`;

  const en = `***The note ${toneName[0].toUpperCase()}7 is placed in the 7th octave.***

# The seventh Octave

Notes in the 7th octave can be played in the orchestra by:

- The piccolo  

For the **violins**, notes in the 7th octave lie in the highest register and are used in the orchestra only very rarely and for specific effects (cf. R. Wagner, *Lohengrin*, opening).

The sound of the **piccolo** in the 7th octave is loud and shrill; therefore, notes in this register are usually required only in tutti passages at *forte*.

For the orchestral sound, the 7th octave is not characteristic apart from these special exceptions.
`;

  return (
    <Markdown className='instrumentDescription' renderAnchors>{t('octLang') === 'de' ? de : en}</Markdown>
  );
};

Four.propTypes = {
  toneName: PropTypes.string
};

Four.defaultProps = {
  toneName: ''
};