import React from 'react';
import { Form, Input } from 'antd';
import Table from './table.js'; 
import { useTranslation } from 'react-i18next';
import Markdown from '@educandu/educandu/components/markdown.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';

export default function OrchestrationDisplay({ content }) {

  const { text, fromFirstNoteIndex, toLastNoteIndex, width } = content;

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  return (
    <div className="EP_Educandu_Orchestration_Assistant_Display">
      <div className={`u-horizontally-centered u-width-${width}`}>
        <Markdown renderAnchors>
          {text}
        </Markdown>
        <Table fromFirstNoteIndex={fromFirstNoteIndex} toLastNoteIndex={toLastNoteIndex} />

        {/* <Form layout="vertical">
          <Form.Item label={t('label')}>
            <Input
              value={input.data?.value || ''}
              maxLength={100}
              disabled={!canModifyInput}
              readOnly={!canModifyInput}
              onChange={handleCurrentValueChange}
              />
          </Form.Item>
        </Form> */}
      </div>
    </div>
  );
}

OrchestrationDisplay.propTypes = {
  ...sectionDisplayProps
};
