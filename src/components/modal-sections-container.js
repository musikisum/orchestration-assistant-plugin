import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../styles-modal-dialog.js';
import instrumentsProvider from '../instruments-provider.js';

export default function ModalSectionsContainer({ modalSelections, setModalSelections }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  
  // Plugin collection
  const strings = instrumentsProvider.getModalSectionObjects('strings');
  const winds = instrumentsProvider.getModalSectionObjects('winds');
  const brass = instrumentsProvider.getModalSectionObjects('brass');
  const tutti = instrumentsProvider.getModalSectionObjects();
  
  const selectionSet = useMemo(() => new Set(modalSelections), [modalSelections]);
  const sections = {
    strings: strings.map(i => i.id),
    winds: winds.map(i => i.id),
    brass: brass.map(i => i.id),
    tutti: tutti.map(i => i.id),
  };

  // Einzelnes Instrument toggeln
  const onInstrumentToggle = (id, checked) => {
    setModalSelections(prev => {
      const s = new Set(prev);
      checked ? s.add(id) : s.delete(id);
      return [...s];
    });
  };

  // Ganze Section toggeln (alle rein oder alle raus)
  const onSectionToggle = (sectionKey, checked) => {
    const ids = sections[sectionKey] || [];
    setModalSelections(prev => {
      const s = new Set(prev);
      if (checked) {
        ids.forEach(id => s.add(id));
      } else {
        ids.forEach(id => s.delete(id));
      }
      return [...s];
    });
  };

  // UI-State pro Section
  const sectionState = key => {
    const ids = sections[key];
    const checked = instrumentsProvider.includesAll(selectionSet, ids);
    const indeterminate = instrumentsProvider.includesAny(selectionSet, ids) && !checked;
    return { checked, indeterminate };
  };

  const stringsState = sectionState('strings');
  const windsState   = sectionState('winds');
  const brassState   = sectionState('brass');
  const tuttiState   = sectionState('tutti');

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
        <div style={styles.section}>fehlt noch</div>
      </div>
      <div style={styles.sectionContainer}>
        <div style={styles.section}>{renderSection(strings)}</div>
        <div style={styles.section}>{renderSection(winds)}</div>
        <div style={styles.section}>{renderSection(brass)}</div>
        <div style={styles.section}>fehlt noch</div>
      </div>      
    </div>
  );
}

ModalSectionsContainer.propTypes = {
  modalSelections: PropTypes.array,
  setModalSelections: PropTypes.func
};

ModalSectionsContainer.defaultProps = {
  modalSelections: [],
  setModalSelections: null
};