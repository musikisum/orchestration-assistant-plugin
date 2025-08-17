import PropTypes from 'prop-types';
import { useClickOutside } from '../use-click-outside.js';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import MarkdownInput from '@educandu/educandu/components/markdown-input.js';

function InstrumentMarkdownEditor({ instrument, saveInstrumentInContent, language }) {

  const lang = language;
  const [description, setDescription] = useState(instrument[lang]);
  const containerRef = useRef(null);

  useEffect(() => {
    setDescription(instrument[lang]);
  }, [instrument, lang]);

  const saveIfDirty = useCallback(() => {
    if (description !== instrument[lang]) {
      saveInstrumentInContent(null, null, { ... instrument, [lang]: description });
    }
  }, [description, instrument, lang, saveInstrumentInContent]);

  const handleChange = event => setDescription( event.target.value);

  useClickOutside(containerRef, saveIfDirty);

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
  instrument: PropTypes.object.isRequired,
  saveInstrumentInContent: PropTypes.func.isRequired,
  language: PropTypes.string
};

InstrumentMarkdownEditor.defaultProps = {
  language: 'de'
};

