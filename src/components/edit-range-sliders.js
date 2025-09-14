import { Slider } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import Info from '@educandu/educandu/components/info.js';
import OrchestrationUtilities from '../orchestration-utilities.js';

function EditRangeSliders({ instrument, saveSliderData }) {
  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  const [range, setRange] = useState([instrument.begin, instrument.end]);

  const handleLiveDate = value => {
    setRange(value);
  };

  const handleSave = value => {
    const [begin, end] = value;
    saveSliderData({ ...instrument, begin, end });
  };

  useEffect(() => {
    setRange([instrument.begin, instrument.end]);
  }, [instrument.begin, instrument.end]);

  return (
    <div className='prop-container-slider-child'>
      <Info tooltip={t('rangeTt')}>{t('range')}</Info>
      <Slider
        range
        min={1}
        max={50}
        value={range}
        style={{ width: '100%' }}
        onChange={handleLiveDate}
        onChangeComplete={handleSave}
        tooltip={{ formatter: value => OrchestrationUtilities.tipFormatterList[value - 1] }}
        />
    </div>
  );
}

export default EditRangeSliders;

EditRangeSliders.propTypes = {
  begin: PropTypes.number,
  end: PropTypes.number,
  instrument: PropTypes.object.isRequired,
  saveSliderData: PropTypes.func.isRequired
};

EditRangeSliders.defaultProps = {
  begin: 1,
  end: 50
};