import React from 'react';
import { Slider } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Info from '@educandu/educandu/components/info.js';
import OrchestrationUtilities from '../orchestration-utilities.js';

function EditRangeSliders({ instrument, saveSliderData }) {
  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  if (!instrument) {
    return null;
  }

  const handleSave = value => {
    if (typeof saveSliderData !== 'function') {
      return;
    }
    const [begin, end] = value;
    saveSliderData({ ...instrument, begin, end });
  };

  return (
    <div className="prop-container-slider-child">
      <Info tooltip={t('rangeTt')}>{t('range')}</Info>
      <Slider
        range
        min={1}
        max={50}
        value={[instrument.begin, instrument.end]}
        style={{ width: '100%' }}
        onChangeComplete={handleSave}
        tooltip={{ formatter: value => OrchestrationUtilities.tipFormatterList[value - 1] }}
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
