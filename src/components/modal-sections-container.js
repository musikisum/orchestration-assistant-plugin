import React from 'react';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import instrumentsProvider from '../instruments-provider.js';

export default function ModalSectionsContainer({ instrumentsSelection, modalSelections, setModalSelections }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  const strings = instrumentsProvider.getModalSectionObjects('strings');

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

  return (
    <div className='modal-section-container'>
      {strings.map(obj => {
        return (
          <Checkbox 
            key={obj.id} 
            defaultChecked={instrumentsSelection.includes(obj.id)}
            onChange={e => onChange(e, obj.id)}
            >
            {t(obj.name)}
          </Checkbox>
        ); 
      })}
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