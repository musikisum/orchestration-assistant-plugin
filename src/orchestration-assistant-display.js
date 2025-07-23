import React from 'react';
import Table from './table.js'; 
// import { useTranslation } from 'react-i18next';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';

export default function OrchestrationAssistantDisplay({ content }) {

  const { text, from, to, width } = content;

  // const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  return (
    <div className="EP_Educandu_Orchestration_Assistant_Display">
      <div className={`u-horizontally-centered u-width-${width}`}>
        <Table from={from} to={to} />
      </div>
    </div>
  );
}

OrchestrationAssistantDisplay.propTypes = {
  ...sectionDisplayProps
};
