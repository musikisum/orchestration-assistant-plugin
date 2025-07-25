import { Form } from 'antd';
import { nanoid } from 'nanoid';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Inspector from './components/inspector.js';
import ToneSlider from './components/tone-slider.js';
import Info from '@educandu/educandu/components/info.js';
import CustomInstrument from './components/custom-instrument.js';
import { FORM_ITEM_LAYOUT } from '@educandu/educandu/domain/constants.js';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';
import ObjectWidthSlider from '@educandu/educandu/components/object-width-slider.js';
import DragAndDropContainer from '@educandu/educandu/components/drag-and-drop-container.js';
import { swapItemsAt, removeItemAt, moveItem } from '@educandu/educandu/utils/array-utils.js';


export default function OrchestrationAssistantEditor({ content, onContentChanged }) {

  // const validatedContent = updateValidation.validateContentAfterUpdates(content);

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  const { width, customInstruments } = content;

  const updateContent = newContentValues => {
    onContentChanged({ ...content, ...newContentValues });
  };

  const droppableIdRef = useRef(nanoid(10));

  const handleItemMove = (fromIndex, toIndex) => {
    const newCustomInstruments = moveItem(customInstruments, fromIndex, toIndex);
    updateContent({ customInstruments: newCustomInstruments });
  };

  const handleMoveModelUp = index => {
    const newCustomInstruments = swapItemsAt(customInstruments, index, index - 1);
    updateContent({ customInstruments: newCustomInstruments });
  };

  const handleMoveModelDown = index => {
    const newCustomInstruments = swapItemsAt(customInstruments, index, index + 1);
    updateContent({ customInstruments: newCustomInstruments });
  };

  const handleDeleteModel = index => {
    const newCustomInstruments = removeItemAt(customInstruments, index);
    updateContent({ customInstruments: newCustomInstruments });
  };

  const handleWidthChange = value => {
    updateContent({ width: value });
  };

  const dragAndDropItems = customInstruments.map((instrument, index, arr) => ({
    key: instrument.key,
    render: ({ dragHandleProps, isDragged, isOtherDragged }) => 
      (<CustomInstrument 
        index={index}
        dragHandleProps={dragHandleProps}
        isDragged={isDragged} 
        isOtherDragged={isOtherDragged} 
        itemsCount={arr.length}
        canDeleteLastItem
        onMoveUp={handleMoveModelUp}
        onMoveDown={handleMoveModelDown}
        onDelete={handleDeleteModel}
        content={content}
        updateContent={updateContent}
        />)
  }));

  return (
    <div className="EP_Educandu_Orchestration_Assistant_Editor">
      <Form labelAlign="left">
        <Form.Item label='Tonumfang' {...FORM_ITEM_LAYOUT}>               
          <ToneSlider content={content} updateContent={updateContent} />
          <div className="annotationText">
            1 = Kontra-C / 2 = Kontra-D ... 49 = h&apos;&apos;&apos;&apos; / 50 = c&apos;&apos;&apos;&apos;&apos; <span style={{ display: 'inline-block', margin: '0 12px' }}><b> | </b></span>c = 1, 8, 15 ... / d = 2, 9, 16 ... / usw.
          </div>
        </Form.Item>
        <Form.Item>
          {
            customInstruments.length === 0 
              ? <div className='noModelContainer'>{t('noModel')}</div> 
              : <DragAndDropContainer
                  droppableId={droppableIdRef.current} 
                  items={dragAndDropItems} 
                  onItemMove={handleItemMove}
                  />
          }
        </Form.Item>
        <Form.Item>
          <Inspector content={content} updateContent={updateContent} />
        </Form.Item>
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
