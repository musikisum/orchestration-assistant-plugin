import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import instrumentsProvider from '../instruments-provider.js';
import ModalSectionsContainer from './modal-sections-container.js';

function SelectDialog({ open, loading, onOk, onCancel, instrumentsSelection, updateContent }) {

  const tuttiFromDataFiles = instrumentsProvider.loadInstrumentsFromNames(['tutti']);
  const strings = instrumentsProvider.loadInstrumentsFromNames(['strings']);
  const winds = instrumentsProvider.loadInstrumentsFromNames(['winds']);
  const brass = instrumentsProvider.loadInstrumentsFromNames(['brass']);

  const tuttiInstrIds = tuttiFromDataFiles.map(item => item.id);
  const customInstr = instrumentsSelection.reduce((accu, item) => {
    if(!tuttiInstrIds.includes(item.id)) {
      accu.push(item);
    }
    return accu;
  }, []);
  
  const defaultFooter = [
    <Button key="back" onClick={onCancel}>
      Return
    </Button>,
    <Button key="submit" type="primary" loading={loading} onClick={onOk}>
      Submit
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
        instruments={tuttiFromDataFiles}
        instrumentsSelection={instrumentsSelection}
        updateContent={updateContent}
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
  updateContent: PropTypes.func
};

SelectDialog.defaultProps = {
  open: false,
  loading: false,
  onOk: null,
  onCancel: null,
  instrumentsSelection: [],
  updateContent: null
};