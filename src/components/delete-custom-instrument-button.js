import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

function DeleteCustomInstrumentButton({ instrument, deleteCustomInstrument }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const handleOnOkClick = () => {
    deleteCustomInstrument(instrument);
    hideModal();
  };

  return (
    <div className='delete-button-inspector-child'>
      <Button type='primary' onClick={showModal} danger>{t('deleteCustom')}</Button>
      <Modal
        title={t('deleteCustomTitle')}
        open={open}
        onOk={handleOnOkClick}
        onCancel={hideModal}
        footer={[
          <Button key="back" onClick={hideModal}>
            {t('deleteCustomNo')}
          </Button>,
          <Button key="delete" type='primary' onClick={handleOnOkClick} danger>
            {t('deleteCustom')}
          </Button>,
        ]}
        >
        <p>{t('deleteCustomText')}</p>
      </Modal>
    </div>
  );
}

export default DeleteCustomInstrumentButton;

DeleteCustomInstrumentButton.propTypes = {
  instrument: PropTypes.object,
  deleteCustomInstrument: PropTypes.func
};

DeleteCustomInstrumentButton.defaultProps = {
  instrument: null,
  deleteCustomInstrument: null
};