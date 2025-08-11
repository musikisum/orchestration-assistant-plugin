import React, { useState } from 'react';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from '../styles-modal-dialog.js';
import instrumentsProvider from '../instruments-provider.js';

export default function ModalSectionsContainer({ modalSelections, setModalSelections }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  const strings = instrumentsProvider.getModalSectionObjects('strings');
  const winds = instrumentsProvider.getModalSectionObjects('winds');
  const brass = instrumentsProvider.getModalSectionObjects('brass');

  const [tuttiSectionCheck, setTuttiSectionCheck] = useState(false);
  const [stringsSectionCheck, setStringsSectionCheck] = useState(false);
  const [windsSectionCheck, setWindsSectionCheck] = useState(false);
  const [brassSectionCheck, setBrassSectionCheck] = useState(false);
  const [customSectionCheck, setCustomSectionCheck] = useState(false);

  // handler and helper function
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
  const assembleCollections = (section, checked) => {
    if (checked) {
      const mergedCollection = instrumentsProvider.mergeSectionAndInstruments(
        modalSelections,
        instrumentsProvider.getModalSectionObjects(section).map(item => item.id)
      );
      setModalSelections(mergedCollection);
    } else {
      const reduceCollection = instrumentsProvider.reduceSectionFromIntruments(
        modalSelections,
        instrumentsProvider.getModalSectionObjects(section).map(item => item.id)
      );
      setModalSelections(reduceCollection);
    }
    if (section === 'strings') {
      setStringsSectionCheck(checked);      
    }
    if (section === 'winds') {
      setWindsSectionCheck(checked);      
    }
    if (section === 'brass') {
      setBrassSectionCheck(checked);      
    }
    if (section === 'tutti') {
      setCustomSectionCheck(checked);    
    }
  };
  const onSectionsCheckChanged = (event, sec) => {
    const value = event.target.checked;
    switch (sec) {
      case 'strings':
        assembleCollections('strings', value);        
        break;
      case 'winds':
        assembleCollections('winds', value); 
        break;
      case 'brass':
        assembleCollections('brass', value); 
        break;
      case 'custom':
        assembleCollections('custom', value); 
        break;
      default:
        assembleCollections('tutti', value); 
        break;
    }
  };

  // checkbox render functions
  const renderSectionSelect = (sec, isChecked) => {
    return (
      <Checkbox 
        key={`${sec}`} 
        checked={isChecked}
        onChange={e => onSectionsCheckChanged(e, sec)}
        >
        {t(sec)}
      </Checkbox>
    );
  };    
  const renderSection = section => {
    return section.map(instrument => {
      return (
        <Checkbox 
          key={instrument.id} 
          checked={setCheck(instrument.id)}
          onChange={e => onChange(e, instrument.id)}
          >
          {t(instrument.name)}
        </Checkbox>
      ); 
    });
  };
  const setCheck = instrumentId => {
    return modalSelections.includes(instrumentId);
  };

  return (
    <div style={styles.modalContainer}>
      <div style={styles.boxHeader}>
        <div>1. Zeile</div>
      </div>
      <div style={styles.boxAll}>
        <div style={styles.section}>{renderSectionSelect('strings', stringsSectionCheck)}</div>
        <div style={styles.section}>{renderSectionSelect('winds', windsSectionCheck)}</div>
        <div style={styles.section}>{renderSectionSelect('brass', brassSectionCheck)}</div>
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