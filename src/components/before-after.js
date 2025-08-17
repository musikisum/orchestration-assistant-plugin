import React from 'react';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Info from '@educandu/educandu/components/info.js';

function BeforeAfter({ instrument, saveInstrumentInContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  const handleCheckChange = (key, value) => {
    const updatedInstrument = { ...instrument, [key]: value };
    saveInstrumentInContent(null, null, updatedInstrument);
  };

  return (
    <div className='prop-container-inspector-child'>
      <div><Info tooltip={t('beforeAfterInfo')} /></div>
      <Checkbox
        checked={instrument.before}
        onChange={e => handleCheckChange('before', e.target.checked)}
        >
        {t('before')}
      </Checkbox>
      <Checkbox
        checked={instrument.after}
        onChange={e => handleCheckChange('after', e.target.checked)}
        >
        {t('after')}
      </Checkbox>
    </div>
  );
}

export default BeforeAfter;

BeforeAfter.propTypes = {
  instrument: PropTypes.object,
  saveInstrumentInContent: PropTypes.func
};

BeforeAfter.defaultProps = {
  instrument: null,
  saveInstrumentInContent: null
};