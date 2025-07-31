import React from 'react';
import TableOfInstruments from './table-of-instruments.js'; 
// import { useTranslation } from 'react-i18next';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';

export default function OrchestrationAssistantDisplay({ content }) {

  const { 
    from, 
    to, 
    width, 
    noteNameBreakPoints, 
    noteNamesAfterLastLine,
    customInstruments 
  } = content;
  
  // const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  return (
    <div className="EP_Educandu_Orchestration_Assistant_Display">
      <div className={`u-horizontally-centered u-width-${width}`}>
        <TableOfInstruments 
          from={from} 
          to={to} 
          selection={content.instrumentSelection} 
          noteNameBreakPoints={noteNameBreakPoints}
          noteNamesAfterLastLine={noteNamesAfterLastLine}
          customInstruments={customInstruments} 
          />
      </div>
    </div>
  );
}

OrchestrationAssistantDisplay.propTypes = {
  ...sectionDisplayProps
};
