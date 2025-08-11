import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import ModalSectionsContainer from './modal-sections-container.js';

function SelectDialog({ open, loading, onOk, onCancel, instrumentsSelection, modalSelections, setModalSelections }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  
  const defaultFooter = [
    <Button key="back" onClick={onCancel}>
      {t('dialogReturn')}
    </Button>,
    <Button key="submit" type="primary" loading={loading} onClick={onOk}>
      {t('dialogSubmit')}
    </Button>,
  ];

  return (
    <Modal
      open={open}
      title='Instrumentenauswahl'
      onOk={onOk}
      onCancel={onCancel}
      footer={defaultFooter}
      >
      <ModalSectionsContainer 
        instrumentsSelection={instrumentsSelection}
        modalSelections={modalSelections}
        setModalSelections={setModalSelections}
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
  instrumentsSelection: PropTypes.array,
  modalSelections: PropTypes.array,
  setModalSelections: PropTypes.func
};

SelectDialog.defaultProps = {
  open: false,
  loading: false,
  onOk: null,
  onCancel: null,
  instrumentsSelection: [],
  modalSelections: [],
  setModalSelections: null
};