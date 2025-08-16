import { Select } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useMemo } from 'react';
import instrumentsProvider from '../instruments-provider.js';

function EditSetSelect({ modalSelections, handleInstrumentSetSelect }) {
  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  const orchestra = useMemo(() => instrumentsProvider.getOrchestraSets, []);
  const chamber   = useMemo(() => instrumentsProvider.getChamberSets, []);
  const sets      = useMemo(() => instrumentsProvider.getSets, []);

  const [currentKey, setCurrentKey] = useState();

  const { orchestraOptions, chamberOptions } = useMemo(() => {
    const toOpt = (key, group) => ({
      key: `${group}:${key}`,
      value: key,          
      label: t(key),
    });
    return {
      orchestraOptions: Object.keys(orchestra || {}).map(key => toOpt(key, 'orch')),
      chamberOptions:   Object.keys(chamber   || {}).map(key => toOpt(key, 'chamber')),
    };
  }, [orchestra, chamber, t]);

  // Initial/Sync-Auswahl anhand modalSelections ermitteln
  useEffect(() => {
    if (!Array.isArray(modalSelections) || !sets) { 
      return; 
    };
    let nextKey;
    for (const [key, instrKeyCollection] of Object.entries(sets)) {
      if (instrumentsProvider.hasTheSameInstruments(modalSelections, instrKeyCollection)) {
        nextKey = key;
        break;
      }
    }
    setCurrentKey(prev => prev === nextKey ? prev : nextKey);
  }, [modalSelections, sets]);

  const onSetChange = (key /* string */) => {
    setCurrentKey(key);
    handleInstrumentSetSelect?.(sets[key]); // callback bekommt das Array
  };

  return (
    <div className='name-container-inspector-child'>
      <Select
        placeholder={t('sets')}
        value={currentKey}
        onChange={onSetChange}
        className='edit-set-select'
        options={[
          {
            key: 'group:orchestra',
            label: t('orchestra'),
            title: t('orchestra'),
            options: orchestraOptions,
          },
          {
            key: 'group:chamber',
            label: t('chamber'),
            title: t('chamber'),
            options: chamberOptions,
          },
        ]}
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
