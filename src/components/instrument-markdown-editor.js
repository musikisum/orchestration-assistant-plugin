import PropTypes from 'prop-types';
import { useClickOutside } from '../use-click-outside.js';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import MarkdownInput from '@educandu/educandu/components/markdown-input.js';

function InstrumentMarkdownEditor({ instrument, saveInstrumentInContent, language }) {

  const lang = language;
  const containerRef = useRef(null);
  const [description, setDescription] = useState(instrument ? instrument[lang]: 'de');

  useEffect(() => {
    if (!instrument) {
      return;
    }
    setDescription(instrument[lang]);
  }, [instrument, lang]);

  const saveIfDirty = useCallback(() => {
    if (!instrument) {
      return;
    }
    if (description !== instrument[lang]) {
      saveInstrumentInContent(null, instrument.id, { ... instrument, [lang]: description });
    }
  }, [description, instrument, lang, saveInstrumentInContent]);

  const handleChange = event => {
    setDescription(event.target.value);
  };

  useClickOutside(containerRef, saveIfDirty);

  if (!instrument) {
    return null;
  }
  return (
    <div ref={containerRef} className='instrument-editor'>
      <MarkdownInput
        value={description}
        onChange={handleChange}
        renderAnchors
        />
    </div>    
  );
}

export default InstrumentMarkdownEditor;

InstrumentMarkdownEditor.propTypes = {
  instrument: PropTypes.object,
  saveInstrumentInContent: PropTypes.func.isRequired,
  language: PropTypes.string
};

InstrumentMarkdownEditor.defaultProps = {
  instrument: null,
  language: 'de'
};

