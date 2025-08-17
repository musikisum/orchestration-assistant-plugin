import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../styles-modal-dialog.js';
import instrumentsProvider from '../instruments-provider.js';

export default function ModalSectionsContainer({ modalSelections, setModalSelections, customInstrumentsCache }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  
  // Plugin collections
  const strings = instrumentsProvider.getModalSectionObjects('strings');
  const winds = instrumentsProvider.getModalSectionObjects('winds');
  const brass = instrumentsProvider.getModalSectionObjects('brass');
  const other = instrumentsProvider.getModalSectionObjects('other');
  const tutti = instrumentsProvider.getModalSectionObjects();
  // Custom instruments as section objects 
  const custom = customInstrumentsCache.map(item => { return { id: item.id, name: item.name }; });

  const selectionSet = useMemo(() => new Set(modalSelections), [modalSelections]);
  
  // Method for checking security (filter undefied) 
  const sectionIds = {
    tutti: tutti.map(item => item.id),
    strings: strings.map(item => item.id),
    winds: winds.map(item => item.id),
    brass: brass.map(item => item.id),
    other: other.map(item => item.id),
    custom: custom.map(item => item.id)
  };
  
  const onInstrumentToggle = (id, checked) => {
    setModalSelections(prev => {
      const s = new Set(prev);
      checked ? s.add(id) : s.delete(id);
      return [...s];
    });
  };

  const onSectionToggle = (sectionKey, checked) => {
    const ids = (sectionIds[sectionKey] || []).filter(Boolean);
    setModalSelections(prev => {
      const s = new Set(prev);
      if (checked) {ids.forEach(id => s.add(id));} else {ids.forEach(id => s.delete(id));}
      return [...s];
    });
  };

  const sectionState = key => {
    const ids = (sectionIds[key] || []).filter(Boolean);
    if (ids.length === 0) {
      return { checked: false, indeterminate: false };
    }
    const checked = instrumentsProvider.includesAll(selectionSet, ids);
    const indeterminate = !checked && instrumentsProvider.includesAny(selectionSet, ids);
    return { checked, indeterminate };
  };

  const tuttiState   = sectionState('tutti');
  const stringsState = sectionState('strings');
  const windsState   = sectionState('winds');
  const brassState   = sectionState('brass');
  const otherState   = sectionState('other');
  const customState  = sectionState('custom');

  const renderSection = sec => {
    return sec.map(instrument => {
      return (
        <Checkbox 
          key={instrument.id} 
          checked={selectionSet.has(instrument.id)}
          onChange={e => onInstrumentToggle(instrument.id, e.target.checked)}
          >
          {t(instrument.name)}
        </Checkbox>
      ); 
    });
  };

  return (
    <div style={styles.modalContainer}>
      <div style={styles.boxHeader}>
        <div>
          <Checkbox
            checked={tuttiState.checked}
            indeterminate={tuttiState.indeterminate}
            onChange={e => onSectionToggle('tutti', e.target.checked)}
            >
            {t('tutti')}
          </Checkbox>
        </div>
      </div>
      <div style={styles.boxAll}>
        <div style={styles.section}>
          <Checkbox
            checked={stringsState.checked}
            indeterminate={stringsState.indeterminate}
            onChange={e => onSectionToggle('strings', e.target.checked)}
            >
            {t('strings')}
          </Checkbox>
        </div>
        <div style={styles.section}>
          <Checkbox
            checked={windsState.checked}
            indeterminate={windsState.indeterminate}
            onChange={e => onSectionToggle('winds', e.target.checked)}
            >
            {t('winds')}
          </Checkbox>
        </div>
        <div style={styles.section}>
          <Checkbox
            checked={brassState.checked}
            indeterminate={brassState.indeterminate}
            onChange={e => onSectionToggle('brass', e.target.checked)}
            >
            {t('brass')}
          </Checkbox>
        </div>
        <div style={styles.section}>
          <Checkbox
            checked={otherState.checked}
            indeterminate={otherState.indeterminate}
            onChange={e => onSectionToggle('other', e.target.checked)}
            >
            {t('other')}
          </Checkbox>
        </div>
        {sectionIds.custom.length > 0 && (
        <div style={styles.section}>
          <Checkbox
            checked={customState.checked}
            indeterminate={customState.indeterminate}
            onChange={e => onSectionToggle('custom', e.target.checked)}
            >
            {t('custom')}
          </Checkbox>
        </div>
        )}
      </div>
      <div style={styles.sectionContainer}>
        <div style={styles.section}>{renderSection(strings)}</div>
        <div style={styles.section}>{renderSection(winds)}</div>
        <div style={styles.section}>{renderSection(brass)}</div>
        <div style={styles.section}>{renderSection(other)}</div>
        {sectionIds.custom.length > 0 && <div style={styles.section}>{renderSection(custom)}</div>}
      </div>      
    </div>
  );
}

ModalSectionsContainer.propTypes = {
  modalSelections: PropTypes.array,
  setModalSelections: PropTypes.func,
  customInstrumentsCache: PropTypes.array
};

ModalSectionsContainer.defaultProps = {
  modalSelections: [],
  setModalSelections: null,
  customInstrumentsCache: []
};