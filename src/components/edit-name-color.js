import { Input } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useClickOutside } from '../useClickOutside.js';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ColorPicker from '@educandu/educandu/components/color-picker.js';

function EditNameColor({ instrument, saveInstrumentInContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  
  const [name, setName] = useState(instrument.name);
  const [color, setColor] = useState(instrument.color);
  const containerRef = useRef(null);

  useEffect(() => {
    setName(instrument.name);
    setColor(instrument.color);
  }, [instrument]);

  const saveIfDirty = useCallback(() => {
    if (color !== instrument.color || name !== instrument.name) {
      saveInstrumentInContent(null, null, { ... instrument, name, color });
    }
  }, [instrument, color, name, saveInstrumentInContent]);

  useClickOutside(containerRef, saveIfDirty);

  const handleNameChance = event => {
    setName(event.target.value);
  };

  const handleColorChange = changedColor => {
    setColor(changedColor);
  };

  return (
    <div ref={containerRef} className='inspector-name-color-container'>
      <div className='name-color-container-child'>
        <span>Name:</span> 
        <Input 
          size='small' 
          value={name} 
          onChange={handleNameChance} 
          placeholder={t('nameInput')} 
          />
      </div>
      <div className='name-color-container-child'>
        <span>Farbe:</span> 
        <ColorPicker 
          className='cp' 
          color={color} 
          onChange={handleColorChange} 
          />
      </div>
    </div>
  );
}

export default EditNameColor;

EditNameColor.propTypes = {
  instrument: PropTypes.object,
  saveInstrumentInContent: PropTypes.func
};

EditNameColor.defaultProps = {
  instrument: null,
  saveInstrumentInContent: null
};