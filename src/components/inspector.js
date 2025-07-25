/* eslint-disable react/jsx-closing-tag-location */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import instrumentProvider from '../instruments-provider.js';
import uniqueId from '@educandu/educandu/utils/unique-id.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import { Button, Select, InputNumber, Checkbox, Typography, Tooltip } from 'antd';

function Inspector({ content, updateContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  const { Text } = Typography;
  const { customInstruments } = content; 

  const handleAddCustomInstrumentButtonClick = () => {
    const instrumentTemplate = cloneDeep(instrumentProvider.getCustomInstrumentTemplate());
    instrumentTemplate.key = uniqueId.create();
    customInstruments.push(instrumentTemplate);
    updateContent({ customInstruments });
  };

  const showTooltipText = checkboxFor => {
    switch (checkboxFor) {
      case 'stretchLastLine':
        return `${t('stretchLastLineTooltip')}`;
      case 'showDescription':
        return `${t('showDescriptionTooltip')}`;
      case 'hideUpperSystem':
        return `${t('hideUpperSystemTooltip')}`;
      case 'hideLowerSystem':
        return `${t('hideLowerSystemTooltip')}`;
      case 'measurePerLine':
        return `${t('measurePerLineToolTip')}`;
      case 'tempo':
        return `${t('tempoToolTip')}`;
      case 'measure':
        return `${t('measureToolTip')}`;
      case 'transpose':
        return `${t('transposeToolTip')}`;
      case 'invertRhythm':
        return `${t('invertRhythmToolTip')}`;
      case 'withTies':
        return `${t('withTiesToolTip')}`;
      case 'cancelUpbeat':
        return `${t('cancelUpbeatToolTip')}`;
      default:
        return '';
    }    
  };

  return (
    <div>
      <div className='inspectorItemContainer'>
        <div className='inspectorUnit'>
          <Button 
            className='inspectorElement elementWidth'
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddCustomInstrumentButtonClick}
            >
            {t('addInstrument')}
          </Button>
        </div>
      </div>
    </div>
  );
}

Inspector.propTypes = {
  content: PropTypes.shape({
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired, 
    customInstruments: PropTypes.array.isRequired
  }).isRequired,
  updateContent: PropTypes.func.isRequired
};

export default Inspector;