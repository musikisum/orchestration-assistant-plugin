import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ModalSectionContainer from './modal-section-container.js';

export default function ModalSectionsContainer({ instruments, instrumentsSelection, updateContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  // const sections = instruments.reduce((accu, instrument) => {
  //   if(!accu.includes(instrument.section)) {
  //     accu.push(instrument.section);
  //   } 
  //   return accu;
  // }, []);
  const sections = ['strings', 'winds', 'brass'];

  return (
    <div className='modal-sections-container'>
      {sections.map((section, index) => (
        <ModalSectionContainer
          key={`${section}-${index}`}
          section={section}
          instruments={instruments}
          instrumentsSelection={instrumentsSelection}
          updateContent={updateContent}
          />))}
    </div>
  );
}

ModalSectionsContainer.propTypes = {
  instruments: PropTypes.array,
  instrumentsSelection: PropTypes.array,
  updateContent: PropTypes.func
};

ModalSectionsContainer.defaultProps = {
  instrumentsSelection: [],
  instruments: null,
  updateContent: null
};