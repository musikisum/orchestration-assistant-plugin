import React from 'react';
import updateValidation from './update-validation.js';
import TableOfInstruments from './table-of-instruments.js'; 
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';

export default function OrchestrationAssistantDisplay({ content }) {

  const { 
    from, 
    to, 
    width,
    instrumentsSelection,
  } = updateValidation.checkContentAfterUpdate(content);

  return (
    <div className="EP_Educandu_Orchestration_Assistant_Display">
      <div className={`u-horizontally-centered u-width-${width}`}>
        <TableOfInstruments 
          from={from} 
          to={to} 
          selection={instrumentsSelection}
          />
      </div>
    </div>
  );
}

OrchestrationAssistantDisplay.propTypes = {
  ...sectionDisplayProps
};
