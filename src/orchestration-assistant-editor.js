import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import React, { useRef, useState } from 'react';
import EditSplitter from './components/edit-splitter.js';
import { PlusOutlined } from '@ant-design/icons';
import ToneSlider from './components/tone-slider.js';
import Info from '@educandu/educandu/components/info.js';
import instrumentsProvider from './instruments-provider.js';
import SelectDialog from './components/select-dialog.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import InstrumentEditor from './components/instrument-editor.js';
import { FORM_ITEM_LAYOUT } from '@educandu/educandu/domain/constants.js';
import { Form, Flex, Splitter, Typography, Button, Checkbox, Tooltip } from 'antd';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';
import ObjectWidthSlider from '@educandu/educandu/components/object-width-slider.js';
import DragAndDropContainer from '@educandu/educandu/components/drag-and-drop-container.js';
import { swapItemsAt, removeItemAt, moveItem } from '@educandu/educandu/utils/array-utils.js';
import InstrumentEntry from './components/instrument-entry.js';

export default function OrchestrationAssistantEditor({ content, onContentChanged }) {

  // const validatedContent = updateValidation.validateContentAfterUpdates(content);

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  const { 
    width, 
    showInstrEdit,
    selectedInstrument, 
    instrumentsSelection
  } = content;

  const updateContent = newContentValues => {
    onContentChanged({ ...content, ...newContentValues });
  };
  
  // Droppable
  const droppableIdRef = useRef(nanoid(10));

  const handleItemMove = (fromIndex, toIndex) => {
    const newSelection = moveItem(instrumentsSelection, fromIndex, toIndex);
    updateContent({ instrumentsSelection: newSelection });
  };

  const handleMoveModelUp = index => {
    const newSelection = swapItemsAt(instrumentsSelection, index, index - 1);
    updateContent({ instrumentsSelection: newSelection });
  };

  const handleMoveModelDown = index => {
    const newSelection = swapItemsAt(instrumentsSelection, index, index - 1);
    updateContent({ instrumentsSelection: newSelection });
  };

  const handleDeleteModel = index => {
    const newSelection = removeItemAt(instrumentsSelection, index);
    updateContent({ instrumentsSelection: newSelection });
  };

  const handleInstrumentNameButtonClick = (event, name) => {
    const instrumentName = name;
    updateContent({ selectedInstrument: instrumentName, showInstrEdit: true });
  };

  // Select dialog
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    const tempSelection = cloneDeep(instrumentsSelection);
    if(!tempSelection.length) {
      tempSelection.push(...instrumentsProvider.loadInstrumentsFromNames(['tutti']));
    }
    updateContent({ instrumentsSelection: tempSelection });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 300);
  };

  // Plugin width
  const handleWidthChange = value => {
    updateContent({ width: value });
  };

  // Instrument list (left plugin site)
  const dragAndDropItems = instrumentsSelection.map((instrument, index, arr) => ({
    key: instrument.id,
    render: ({ dragHandleProps, isDragged, isOtherDragged }) => 
      (<InstrumentEntry 
        index={index}
        dragHandleProps={dragHandleProps}
        isDragged={isDragged} 
        isOtherDragged={isOtherDragged} 
        itemsCount={arr.length}
        canDeleteLastItem
        onMoveUp={handleMoveModelUp}
        onMoveDown={handleMoveModelDown}
        onDelete={handleDeleteModel}
        onInstrumentName={handleInstrumentNameButtonClick}
        content={content}
        updateContent={updateContent}
        />)
  }));

  const dragAndDropContainer = (
    <div className="instruments-list">
      <DragAndDropContainer
        droppableId={droppableIdRef.current} 
        items={dragAndDropItems} 
        onItemMove={handleItemMove}
        />
    </div>
  );

  // Poperty section (right plugin site)
  const propContainer = (
    <div className="prop-container">
      <div>
        <Button type='primary' icon={<PlusOutlined />} onClick={() => setOpen(true)}>{t('add')}</Button>
      </div>
      { showInstrEdit ? <InstrumentEditor name={selectedInstrument} /> : null }
    </div>
  );

  return (
    <div className="EP_Educandu_Orchestration_Assistant_Editor">
      <div className="edit-wrapper">
        <div className="edit-container">
          <EditSplitter 
            panelA={dragAndDropContainer}
            panelB={propContainer}
            />
        </div>
        <Form labelAlign="left">
          <Form.Item
            label={<Info tooltip={t('common:widthInfo')}>{t('common:width')}</Info>}
            {...FORM_ITEM_LAYOUT}
            >
            <ObjectWidthSlider value={width} onChange={handleWidthChange} />
          </Form.Item>
        </Form>
      </div>
      <SelectDialog
        open={open}
        loading={loading}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
        instrumentsSelection={instrumentsSelection}
        updateContent={updateContent}
        />
    </div>
  );
}

OrchestrationAssistantEditor.propTypes = {
  ...sectionEditorProps
};
