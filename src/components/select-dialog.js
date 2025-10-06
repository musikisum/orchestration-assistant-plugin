import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import ModalSectionsContainer from './modal-sections-container.js';

function SelectDialog({ 
  open, 
  loading, 
  onOk, 
  onCancel, 
  modalSelections, 
  onSelectionsChange, 
  instrumentsSelection, 
  customInstrumentsCache 
}) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  
  const defaultFooter = [
    <Button key="back" onClick={onCancel}>{t('dialogReturn')}</Button>,
    <Button key="submit" type="primary" loading={loading} onClick={onOk}>{t('dialogSubmit')}</Button>,
  ];

  return (
    <Modal
      open={open}
      title={t('instrumentSelection')}
      onOk={onOk}
      onCancel={onCancel}
      footer={defaultFooter}
      type='primary'
      width='90%'
      style={{ maxWidth:'800px' }}
      >
      <ModalSectionsContainer 
        modalSelections={modalSelections}
        onSelectionsChange={onSelectionsChange}
        instrumentsSelection={instrumentsSelection}
        customInstrumentsCache={customInstrumentsCache}
        />
    </Modal>
  );
}

export default SelectDialog;

SelectDialog.propTypes = {
  open: PropTypes.bool,
  loading: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  modalSelections: PropTypes.array,
  onSelectionsChange: PropTypes.func,
  instrumentsSelection: PropTypes.array,
  customInstrumentsCache: PropTypes.array
};

SelectDialog.defaultProps = {
  open: false,
  loading: false,
  onOk: null,
  onCancel: null,
  modalSelections: [],
  onSelectionsChange: null,
  instrumentsSelection: [],
  customInstrumentsCache: []
};