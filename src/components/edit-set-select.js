import { Select } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import instrumentsProvider from '../instruments-provider.js';

function EditSetSelect({ modalSelections, handleInstrumentSetSelect }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  const sets = instrumentsProvider.sets;

  const [current, setCurrent] = useState();

  useEffect(() => {
    let next = '';
    if (Array.isArray(modalSelections) && sets) {
      for (const [key, set] of Object.entries(sets)) {
        if (instrumentsProvider.hasTheSameInstruments(modalSelections, set)) {
          next = key;
          break;
        }
      }
    }
    setCurrent(prev => prev === next ? prev : next);
  }, [modalSelections, sets]);

  const onSetChange = value => {
    const set = sets[value];
    setCurrent(set);
    handleInstrumentSetSelect(set);
  };

  return (
    <div className='name-container-inspector-child'>
      <Select
        placeholder={t('sets')}
        value={t(current)}
        onChange={onSetChange}
        style={{ width: 160 }}
        options={Object.keys(sets).map(key => {
          return { value: key, label: t(key) };
        })}
        />
    </div>
  );
}

export default EditSetSelect;

EditSetSelect.propTypes = {
  modalSelections: PropTypes.array,
  handleInstrumentSetSelect: PropTypes.func
};

EditSetSelect.defaultProps = {
  modalSelections: [],
  handleInstrumentSetSelect: null
};