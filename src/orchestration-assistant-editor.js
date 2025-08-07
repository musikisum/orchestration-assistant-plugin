import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import React, { useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ToneSlider from './components/tone-slider.js';
import Info from '@educandu/educandu/components/info.js';
import instrumentsProvider from './instruments-provider.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import { Form, Select, Button, Checkbox, Tooltip } from 'antd';
import { FORM_ITEM_LAYOUT } from '@educandu/educandu/domain/constants.js';
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
    instrumentSelection, 
    noteNameBreakPoints, 
    noteNamesAfterLastLine 
  } = content;

  const updateContent = newContentValues => {
    onContentChanged({ ...content, ...newContentValues });
  };

  const droppableIdRef = useRef(nanoid(10));

  const handleItemMove = (fromIndex, toIndex) => {
    const newSelection = moveItem(instrumentSelection, fromIndex, toIndex);
    updateContent({ instrumentSelection: newSelection });
  };

  const handleMoveModelUp = index => {
    const newSelection = swapItemsAt(instrumentSelection, index, index - 1);
    updateContent({ instrumentSelection: newSelection });
  };

  const handleMoveModelDown = index => {
    const newSelection = swapItemsAt(instrumentSelection, index, index - 1);
    updateContent({ instrumentSelection: newSelection });
  };

  const handleDeleteModel = index => {
    const newSelection = removeItemAt(instrumentSelection, index);
    updateContent({ instrumentSelection: newSelection });
  };

  const handleSelectChange = () => {
    // missing: modal dialog for choosing instruments 
    const newSelection = instrumentsProvider.loadInstruments();
    updateContent({ instrumentSelection: newSelection });
  };

  const handleInstrumentNameButtonClick = (event, name) => {
    console.log('Instrument name clicked', name);
  };

  const handleWidthChange = value => {
    updateContent({ width: value });
  };

  const dragAndDropItems = instrumentSelection.map((instrument, index, arr) => ({
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

  return (
    <div className="EP_Educandu_Orchestration_Assistant_Editor">
      <div className="edit-wrapper">
        <div className="edit-container">
          <div className="instruments-list">
            <DragAndDropContainer
              droppableId={droppableIdRef.current} 
              items={dragAndDropItems} 
              onItemMove={handleItemMove}
              />
          </div>
          <div className="prop-container">
            <div>
              <Button onClick={handleSelectChange}>Instrument hinzufügen</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

OrchestrationAssistantEditor.propTypes = {
  ...sectionEditorProps
};
