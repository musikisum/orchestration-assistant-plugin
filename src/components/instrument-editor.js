import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import instrumentsProvider from '../instruments-provider.js';
import Markdown from '@educandu/educandu/components/markdown.js';

function InstrumentEditor({ name }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  const result = instrumentsProvider.loadInstrumentsFromNames([name]);
  const instrument = result[0];

  return instrument
    ? (
      <Markdown className='instrumentDescription' renderAnchors>{instrument[t('language')]}</Markdown>
    )
    : (
      <div>Fehler!</div>
    );
}

export default InstrumentEditor;

InstrumentEditor.propTypes = {
  name: PropTypes.string
};

InstrumentEditor.defaultProps = {
  name: ''
};