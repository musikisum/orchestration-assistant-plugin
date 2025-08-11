import React from 'react';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from '../styles-modal-dialog.js';
import instrumentsProvider from '../instruments-provider.js';

export default function ModalSectionsContainer({ instrumentsSelection, modalSelections, setModalSelections }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  const strings = instrumentsProvider.getModalSectionObjects('strings');
  const winds = instrumentsProvider.getModalSectionObjects('winds');
  const brass = instrumentsProvider.getModalSectionObjects('brass');

  const onChange = (event, id) => {
    const value = event.target.checked;
    const isInList = modalSelections.includes(id);
    if (value && !isInList) {
      setModalSelections([...modalSelections, id]);
    }
    if (!value && isInList) {
      setModalSelections([...modalSelections.filter(item => item !== id)]);
    }
  };

  const setCheck = id => {
    return instrumentsSelection.some(item => item.id === id);
  };

  const renderSection = section => {
    return section.map(obj => {
      return (
        <Checkbox 
          key={obj.id} 
          defaultChecked={setCheck(obj.id)}
          onChange={e => onChange(e, obj.id)}
          >
          {t(obj.name)}
        </Checkbox>
      ); 
    });
  };

  return (
    <div style={styles.modalContainer}>
      <div style={styles.boxHeader}>
        <div>1. Zeile</div>
      </div>
      <div style={styles.boxAll}>
        <div>all</div>
      </div>
      <div style={styles.sectionContainer}>
        <div style={styles.section}>{renderSection(strings)}</div>
        <div style={styles.section}>{renderSection(winds)}</div>
        <div style={styles.section}>{renderSection(brass)}</div>
        <div style={styles.section}>Hallo Welt!</div>
      </div>      
    </div>
  );
}

ModalSectionsContainer.propTypes = {
  instrumentsSelection: PropTypes.array,
  modalSelections: PropTypes.array,
  setModalSelections: PropTypes.func
};

ModalSectionsContainer.defaultProps = {
  instrumentsSelection: [],
  modalSelections: [],
  setModalSelections: null
};