import { Slider } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import Info from '@educandu/educandu/components/info.js';
import OrchestrationUtilities from '../orchestration-utilities.js';

function EditRangeSliders({ instrument, saveSliderData }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  const [begin, setBegin] = useState(instrument.begin);
  const [end, setEnd] = useState(instrument.end);

  const handleLiveDate = (value, direction) => {
    if (direction === 'left' && value < end) {
      setBegin(value);
    } 
    if(direction === 'right' && end > begin)  {
      setEnd(value);
    }
  };

  const handleSave = (value, direction) => {
    if (direction === 'left' && value < end) {
      saveSliderData({ ...instrument, begin: value });
    } 
    if(direction === 'right' && end > begin)  {
      saveSliderData({ ...instrument, end: value });
    }
  };

  useEffect(() => {
    setBegin(instrument.begin);
    setEnd(instrument.end);
  }, [instrument.begin, instrument.end]);

  return (
    <React.Fragment>
      <div className='prop-container-slider-child'>
        <Info tooltip={t('rangeBottomTt')}>{t('rangeBottom')}</Info>
        <Slider
          min={1}
          max={49}
          value={begin}
          style={{ width: '100%' }}
          onChange={value => handleLiveDate(value, 'left')}
          onChangeComplete={value => handleSave(value, 'left')}
          tooltip={{ formatter: value => OrchestrationUtilities.tipFormatterList[value - 1] }}
          />
      </div>
      <div className='prop-container-slider-child'>
        <Info tooltip={t('rangeTopTt')}>{t('rangeTop')}</Info>
        <Slider
          min={2}
          max={50}
          value={end}
          style={{ width: '100%' }}
          onChange={value => handleLiveDate(value, 'right')}
          onChangeComplete={value => handleSave(value, 'right')}
          tooltip={{ formatter: value => OrchestrationUtilities.tipFormatterList[value - 1] }}
          />
      </div>
    </React.Fragment>
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