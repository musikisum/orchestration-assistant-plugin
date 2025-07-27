import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import React, { useState, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ToneSlider from './components/tone-slider.js';
import Info from '@educandu/educandu/components/info.js';
import instrumentsProvider from './instruments-provider.js';
import { Form, Select, Button, Checkbox, Space } from 'antd';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import CustomInstrument from './components/custom-instrument.js';
import { FORM_ITEM_LAYOUT } from '@educandu/educandu/domain/constants.js';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';
import ObjectWidthSlider from '@educandu/educandu/components/object-width-slider.js';
import DragAndDropContainer from '@educandu/educandu/components/drag-and-drop-container.js';
import { swapItemsAt, removeItemAt, moveItem } from '@educandu/educandu/utils/array-utils.js';

export default function OrchestrationAssistantEditor({ content, onContentChanged }) {

  // const validatedContent = updateValidation.validateContentAfterUpdates(content);

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  const { 
    width, 
    customInstruments, 
    instrumentSelection, 
    noteNameBreakPoints, 
    noteNamesAfterLastLine 
  } = content;

  const [hasStrings, setHasStrings] = useState();

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

  const handleSelectChange = values => {
    const newSelection = instrumentsProvider.createInstrumentsFromSelection(values);
    updateContent({ instrumentSelection: newSelection });
  };

  const handleNoteNameSelectChange = values => {
    const newBraekPoints = [...values];
    updateContent({ noteNameBreakPoints: newBraekPoints });
  };

  const onCheckBoxChange = e => {
    const checked = e.target.checked;
    updateContent({ noteNamesAfterLastLine: checked });
  };

  const createInstrumentSelectOptions = selection => {
    // TODO: Add custom instruments
    const options = [];
    const hasOrchestraStrings = selection.some(instr => instrumentsProvider.getSectionInstrumentNames('strings').includes(instr));
    const hasOrchestraWinds = selection.some(instr => instrumentsProvider.getSectionInstrumentNames('winds').includes(instr));
    const hasOrchestraBrass = selection.some(instr => instrumentsProvider.getSectionInstrumentNames('brass').includes(instr));
    if(!hasOrchestraStrings) {
      options.push({ value: 'strings', label: t('strings') });
    }
    if(!hasOrchestraWinds) {
      options.push({ value: 'winds', label: t('winds') });
    }
    if(!hasOrchestraBrass) {
      options.push({ value: 'brass', label: t('brass') });
    }
    const allInstruments = instrumentsProvider.getSortedInstrumentNames();
    for (let i = 0; i < allInstruments.length; i += 1) {
      options.push({
        value: allInstruments[i],
        label: t(`${allInstruments[i]}`)
      });
    }
    return options;
  };  

  const createNoteNameSelectOptions = () => {
    const options = [];
    const allInstruments = instrumentsProvider.getSortedInstrumentNames();
    for (let i = 0; i < allInstruments.length; i += 1) {
      options.push({
        value: allInstruments[i],
        label: t(`${allInstruments[i]}`)
      });
    }
    return options;
  };  

  const handleAddCustomInstrumentButtonClick = () => {
    const instrumentTemplate = cloneDeep(instrumentsProvider.getCustomInstrumentTemplate());
    instrumentTemplate.key = nanoid(10);
    customInstruments.push(instrumentTemplate);
    updateContent({ customInstruments });
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
        <Form.Item label={t('selection')} {...FORM_ITEM_LAYOUT}>
          <Select
            mode="multiple"
            size='middle'
            placeholder={t('chooseInstrument')}
            value={content.instrumentSelection}
            onChange={handleSelectChange}
            style={{ width: '100%' }}
            options={createInstrumentSelectOptions(instrumentSelection)}
            />
        </Form.Item>
        <Form.Item label={t('noteNames')} {...FORM_ITEM_LAYOUT}>
          <Select
            mode="multiple"
            size='middle'
            placeholder={t('noteNameText')}
            value={noteNameBreakPoints}
            onChange={handleNoteNameSelectChange}
            style={{ width: '100%' }}
            options={createNoteNameSelectOptions()}
            />
          <Checkbox checked={noteNamesAfterLastLine} onChange={onCheckBoxChange} style={{ marginTop: '6px' }}>
            {t('lastLine')}
          </Checkbox>
        </Form.Item>
        { customInstruments.length
          ? (
            <Form.Item label={customInstruments.length === 0 ? ' ' : t('ownInstruments')} {...FORM_ITEM_LAYOUT}>
              <DragAndDropContainer
                droppableId={droppableIdRef.current} 
                items={dragAndDropItems} 
                onItemMove={handleItemMove}
                />
            </Form.Item>)
          : null}
        <Form.Item label={t('addLabel')} {...FORM_ITEM_LAYOUT}>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddCustomInstrumentButtonClick}
            >
            {t('addInstrument')}
          </Button>
        </Form.Item>
        <Form.Item label={t('range')} {...FORM_ITEM_LAYOUT}>               
          <ToneSlider content={content} updateContent={updateContent} />
          <div className="annotationText">
            {t('rangeText')}
          </div>
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
