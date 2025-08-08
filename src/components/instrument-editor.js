import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import MarkdownInput from '@educandu/educandu/components/markdown-input.js';

function InstrumentEditor({ content, updateContent }) {
  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  const instrument = content.instrumentsSelection.find(obj => obj.id === content.selectedInstrument);
  const lastInitializedId = useRef(null);

  useEffect(() => {
    if (instrument && instrument.id !== lastInitializedId.current) {
      updateContent({ actuallyText: instrument.text || '' });
      lastInitializedId.current = instrument.id;
    }
  }, [instrument, updateContent]);

  const handleTextChanged = event => {
    const newText = event.target.value;
    updateContent({ actuallyText: newText });
  };

  return instrument
    ? (
      <div className="instrumentText">
        <MarkdownInput value={content.actuallyText} onChange={handleTextChanged} renderAnchors />
      </div>
    )
    : (
      <div>Fehler!</div>
    );
}

export default InstrumentEditor;

InstrumentEditor.propTypes = {
  content: PropTypes.object,
  instrumentsSelection: PropTypes.array,
  updateContent: PropTypes.func
};

InstrumentEditor.defaultProps = {
  content: null,
  instrumentsSelection: [],
  updateContent: null
};