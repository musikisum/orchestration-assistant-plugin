import React from 'react';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function ModalSectionContainer({ section, instruments, checkedInstruments, updateContent }) {
  console.log('checkedInstruments:', checkedInstruments);

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  const onChange = (event, id) => {
    const value = event.target.checked;
    const isInList = checkedInstruments.includes(id);
    let tempList = [...checkedInstruments];
    if (value && !isInList) {
      tempList.push(id);
      console.log('tempList:', tempList)
    }
    if (!value && isInList) {
      tempList = tempList.filter(item => item !== id);
    }
    updateContent({ checkedInstruments: tempList });
  };

  return (
    <div className='modal-section-container'>
      {instruments.map(instr => {
        const isChecked = checkedInstruments.includes(instr.id);
        return (
          <Checkbox 
            key={instr.id} 
            checked={isChecked} 
            onChange={e => onChange(e, instr.id)}
            >
            {t(instr.name)}
          </Checkbox>
        ); 
      })}
    </div>
  );
}

ModalSectionContainer.propTypes = {
  section: PropTypes.string,
  instruments: PropTypes.array,
  checkedInstruments: PropTypes.array,
  updateContent: PropTypes.func
};

ModalSectionContainer.defaultProps = {
  section: '',
  checkedInstruments: [],
  instruments: null,
  updateContent: null
};