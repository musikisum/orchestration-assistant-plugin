import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import instrumentsProvider from '../instruments-provider.js';

function SelectDialog({ open, loading, onOk, onCancel, instrumentsSelection, updateContent }) {
  
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
      {instrumentsSelection.length 
        ? instrumentsSelection.map((instr, index) => {
          return <div key={index}>{instr.name}</div>;
        }) 
        : instrumentsProvider.loadInstrumentsFromNames(['tutti']).map((instr, index) => {
          return <div key={index}>{instr.name}</div>;
        })}
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