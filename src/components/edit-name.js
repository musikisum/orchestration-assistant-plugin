import { Input } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useClickOutside } from '../useClickOutside.js';
import React, { useState, useCallback, useRef, useEffect } from 'react';

function EditName({ instrument, saveInstrumentInContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  
  const [name, setName] = useState(instrument.name);
  const containerRef = useRef(null);

  useEffect(() => {
    setName(instrument.name);
  }, [instrument]);

  const saveIfDirty = useCallback(() => {
    if (name !== instrument.name) {
      saveInstrumentInContent(null, null, { ... instrument, name });
    }
  }, [instrument, name, saveInstrumentInContent]);

  useClickOutside(containerRef, saveIfDirty);

  const handleNameChance = event => {
    setName(event.target.value);
  };

  return (
    <div ref={containerRef} className='name-container-inspector-child'>
      <span>Name:</span> 
      <Input
        size='small' 
        value={t(`${name}`)} 
        style={{ minWidth: '100px' }}
        name={instrument.name} 
        onChange={handleNameChance} 
        placeholder={t('nameInput')}
        />
    </div>
  );
}

export default EditName;

EditName.propTypes = {
  instrument: PropTypes.object,
  saveInstrumentInContent: PropTypes.func
};

EditName.defaultProps = {
  instrument: null,
  saveInstrumentInContent: null
};