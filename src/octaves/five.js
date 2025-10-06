import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Markdown from '@educandu/educandu/components/markdown.js';

export default function Five({ toneName }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  
  const de = `***Das ${toneName[0]}''''' liegt in der fünfgestrichenen Oktave (${toneName[0]}⁵).***

# Die fünfgestrichene Oktave

Im Orchesterklang ist die fünfgestrichene Oktave nicht relevant.
`;

  const en = `***The note ${toneName[0].toUpperCase()}8 is placed in the 8th octave.***

# The eighth Octave

In the orchestral sound, the 8th octave is not relevant.
`;

  return (
    <Markdown className='instrumentDescription' renderAnchors>{t('language') === 'de' ? de : en}</Markdown>
  );
};

Five.propTypes = {
  toneName: PropTypes.string
};

Five.defaultProps = {
  toneName: ''
};