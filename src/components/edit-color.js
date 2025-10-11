import React from 'react';
import colors from '../colors.js';
import PropTypes from 'prop-types';
import ColorPicker from '@educandu/educandu/components/color-picker.js';

function EditColor({ instrument, saveInstrumentInContent }) {

  if (!instrument) {
    return null;
  }

  const handleColorChange = changedColor => {
    saveInstrumentInContent(null, instrument.id, { ... instrument, color: changedColor });
  };

  return (
    <div className='prop-container-inspector-child'>
      <span>Farbe:</span> 
      <ColorPicker 
        className='cp' 
        color={instrument.color ?? colors.default} 
        onChange={handleColorChange}
        />
    </div>
  );
}

export default EditColor;

EditColor.propTypes = {
  instrument: PropTypes.object,
  saveInstrumentInContent: PropTypes.func
};

EditColor.defaultProps = {
  instrument: null,
  saveInstrumentInContent: null
};