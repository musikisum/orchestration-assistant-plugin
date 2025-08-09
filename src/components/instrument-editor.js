import React from 'react';
import PropTypes from 'prop-types';
import MarkdownInput from '@educandu/educandu/components/markdown-input.js';

function InstrumentEditor({ content, updateContent }) {
  
  const lang = content.inputLanguage || 'de';
  const selectedId = content.selectedInstrument;

  const handleChange = event => {
    const text = event.target.value;
    updateContent({
      actuallyText: { ...content.actuallyText, [lang]: text }
    });
  };

  const hasInstrument = content.instrumentsSelection.some(i => i.id === selectedId);
  if (!hasInstrument) {
    return <div>Fehler!</div>;
  }

  return (
    <MarkdownInput
      value={content.actuallyText[lang]}
      onChange={handleChange}
      renderAnchors
      />
  );
}

InstrumentEditor.propTypes = {
  content: PropTypes.object.isRequired,
  updateContent: PropTypes.func.isRequired
};

export default InstrumentEditor;
