import React from 'react';
import { useTranslation } from 'react-i18next';
import Markdown from '@educandu/educandu/components/markdown.js';

export default function ErrorInfo() {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  const de = 'Ein Fehler ist aufgetreten, es liegen keine Oktav-Informationen vor.';
  const en = 'An error has occurred; there is no information for the requested octave.';

  return (
    <Markdown className='instrumentDescription' renderAnchors>{t('octLang') === 'de' ? de : en}</Markdown>
  );
};