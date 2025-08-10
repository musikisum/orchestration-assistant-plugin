import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import MarkdownInput from '@educandu/educandu/components/markdown-input.js';

function InstrumentEditor({ instrument, saveInstrumentInContent }) {

  const lang = 'de'; // erst mal statisch, dafür mache ich später einen switch-Button
  const [description, setDescription] = useState(instrument[lang]);

  useEffect(() => {
    setDescription(instrument[lang]);
  }, [instrument, lang]);

  useEffect(() => {
    const handleClickOutside = event => {
      const instrumentEditor = document.querySelector('.instrument-editor'); 
      if (instrumentEditor && !instrumentEditor.contains(event.target)) {
        if (description !== instrument[lang]) {
          saveInstrumentInContent(null, null, { ...instrument, [lang]: description });
        }        
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [instrument, lang, description, saveInstrumentInContent]);

  // const handleChange = e => setDescription(e.target.value);
  const handleChange = event => {
    const text = event.target.value;
    setDescription(text);
  };

  return (
    <div className='instrument-editor'>
      <MarkdownInput
        value={description}
        onChange={handleChange}
        renderAnchors
        />
    </div>    
  );
}

InstrumentEditor.propTypes = {
  instrument: PropTypes.object.isRequired,
  saveInstrumentInContent: PropTypes.func.isRequired
};

export default InstrumentEditor;
