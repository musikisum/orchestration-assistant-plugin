import React from 'react';
import { Form, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import ToneSlider from './components/tone-slider.js';
import Info from '@educandu/educandu/components/info.js';
import { FORM_ITEM_LAYOUT } from '@educandu/educandu/domain/constants.js';
import MarkdownInput from '@educandu/educandu/components/markdown-input.js';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';
import ObjectWidthSlider from '@educandu/educandu/components/object-width-slider.js';

export default function OrchestrationAssistantEditor({ content, onContentChanged }) {

  const { t } = useTranslation('educandu/educandu-plugin-example');
  const { text, width, from, to } = content;
  const { Title, Paragraph, Text, Link } = Typography;

  const updateContent = newContentValues => {
    onContentChanged({ ...content, ...newContentValues });
  };

  // const handleTextChanged = event => {
  //   updateContent({ text: event.target.value });
  // };

  const handleWidthChange = value => {
    updateContent({ width: value });
  };

  return (
    <div className="EP_Educandu_Orchestration_Assistant_Editor">
      <Form labelAlign="left">
        <Form.Item label='Tonumfang' {...FORM_ITEM_LAYOUT}>               
          <ToneSlider content={content} updateContent={updateContent} />
          <div className="annotationText">
            1 = Kontra-C / 2 = Kontra-D ... 49 = h&apos;&apos;&apos;&apos; / 50 = c&apos;&apos;&apos;&apos;&apos; <span style={{ display: 'inline-block', margin: '0 12px' }}><b> | </b></span>c = 1, 8, 15 ... / d = 2, 9, 16 ... / usw.
          </div>
        </Form.Item>
        {/* <Form.Item label={t('common:text')} {...FORM_ITEM_LAYOUT}>
          <MarkdownInput value={text} onChange={handleTextChanged} renderAnchors />
        </Form.Item> */}
        <Form.Item
          label={<Info tooltip={t('common:widthInfo')}>{t('common:width')}</Info>}
          {...FORM_ITEM_LAYOUT}
          >
          <ObjectWidthSlider value={width} onChange={handleWidthChange} />
        </Form.Item>
      </Form>
    </div>
  );
}

OrchestrationAssistantEditor.propTypes = {
  ...sectionEditorProps
};
