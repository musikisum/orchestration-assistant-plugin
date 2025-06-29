import React from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import Markdown from '@educandu/educandu/components/markdown.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';

export default function ServerTimeDisplay({ content, input, canModifyInput, onInputChanged }) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  const handleCurrentValueChange = event => {
    onInputChanged({ value: event.target.value });
  };

  return (
    <div className="EP_Educandu_Orchestration_Assistant_Display">
      <div className={`u-horizontally-centered u-width-${content.width}`}>
        <Markdown renderAnchors>
          {content.text}
        </Markdown>
        <Form layout="vertical">
          <Form.Item label={t('label')}>
            <Input
              value={input.data?.value || ''}
              maxLength={100}
              disabled={!canModifyInput}
              readOnly={!canModifyInput}
              onChange={handleCurrentValueChange}
              />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

ServerTimeDisplay.propTypes = {
  ...sectionDisplayProps
};
