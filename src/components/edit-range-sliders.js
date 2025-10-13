import { Slider } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import Info from '@educandu/educandu/components/info.js';
import OrchestrationUtilities from '../orchestration-utilities.js';

function EditRangeSliders({ instrument, saveSliderData }) {
  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  const [sliderValue, setSliderValue] = useState([1, 50]);

  useEffect(() => {
    if (instrument) {
      setSliderValue([instrument.begin, instrument.end]);
    }
  }, [instrument]);

  if (!instrument) {
    return null;
  }

  const handleChange = value => {
    setSliderValue(value);
  };

  const handleSave = value => {
    if (typeof saveSliderData !== 'function') {
      return;
    }
    if (!Array.isArray(value) || value.length !== 2) {
      return;
    }    
    const [begin, end] = value;
    if (begin !== instrument.begin || end !== instrument.end) {
      saveSliderData({ ...instrument, begin, end });
    }
  };

  return (
    <div className="prop-container-slider-child">
      <Info tooltip={t('rangeTt')}>{t('range')}</Info>
      <Slider
        range
        min={1}
        max={50}
        value={sliderValue}
        onChange={handleChange}
        onChangeComplete={handleSave}
        tooltip={{ formatter: value => OrchestrationUtilities.tipFormatterList[value - 1] }}
        style={{ width: '100%' }}
        aria-label={t('range')}
        />
    </div>
  );
}

export default EditRangeSliders;

EditRangeSliders.propTypes = {
  instrument: PropTypes.object,
  saveSliderData: PropTypes.func
};

EditRangeSliders.defaultProps = {
  instrument: null,
  saveSliderData: null
};
