import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import React, { useRef, useState, useEffect } from 'react';
import EditSplitter from './components/edit-splitter.js';
import { PlusOutlined } from '@ant-design/icons';
import Info from '@educandu/educandu/components/info.js';
import instrumentsProvider from './instruments-provider.js';
import SelectDialog from './components/select-dialog.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import InstrumentEditor from './components/instrument-editor.js';
import { FORM_ITEM_LAYOUT } from '@educandu/educandu/domain/constants.js';
import { Form, Button } from 'antd';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';
import ObjectWidthSlider from '@educandu/educandu/components/object-width-slider.js';
import DragAndDropContainer from '@educandu/educandu/components/drag-and-drop-container.js';
import { swapItemsAt, removeItemAt, moveItem } from '@educandu/educandu/utils/array-utils.js';
import InstrumentEntry from './components/instrument-entry.js';

export default function OrchestrationAssistantEditor({ content, onContentChanged }) {
  const {
    width,
    inputLanguage,
    showInstrEdit,
    selectedInstrument,
    instrumentsSelection
  } = content;

  const updateContent = React.useCallback(
    newContentValues => {
      onContentChanged({ ...content, ...newContentValues });
    },
    [content, onContentChanged]
  );
  
  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  const buffered = content.actuallyText[inputLanguage];

  const selectionRef = useRef(instrumentsSelection);
  const updateRef = useRef(updateContent);

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    selectionRef.current = instrumentsSelection;
  }, [instrumentsSelection]);

  useEffect(() => {
    updateRef.current = updateContent;
  }, [updateContent]);

  // Autosave für Markdown-Buffer (debounced)
  useEffect(() => {
    if (!selectedInstrument) {
      return () => {};
    }
    const timer = setTimeout(() => {
      const list = [...instrumentsSelection];
      const target = list.find(item => item.id === selectedInstrument);
      if (!target) {
        return;
      }
      if (target[inputLanguage] !== buffered) {
        target[inputLanguage] = buffered;
        updateRef.current({ instrumentsSelection: list });
      }
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [buffered, selectedInstrument, inputLanguage, instrumentsSelection]);

  // Droppable section
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
    const newSelection = swapItemsAt(instrumentsSelection, index, index + 1);
    updateContent({ instrumentsSelection: newSelection });
  };
  const handleDeleteModel = index => {
    const newSelection = removeItemAt(instrumentsSelection, index);
    updateContent({ instrumentsSelection: newSelection });
  };

  // Instrument select 
  const handleInstrumentNameButtonClick = (_event, id) => {
    setSelectedItem(id);
    if (id === content.selectedInstrument) {
      updateContent({ showInstrEdit: true });
      return;
    }
    // flush buffer
    const list = cloneDeep(content.instrumentsSelection);
    const current = list.find(item => item.id === content.selectedInstrument);
    if (current && current[inputLanguage] !== buffered) {
      current[inputLanguage] = buffered;
    }
    // initialize new buffer
    const nextInstrument = list.find(item => item.id === id);
    const nextText = nextInstrument ? nextInstrument[inputLanguage] : '';
    updateContent({
      instrumentsSelection: list,
      selectedInstrument: id,
      showInstrEdit: true,
      actuallyText: { ...content.actuallyText, [inputLanguage]: nextText }
    });
  };

  // Modal dialog for instrument selection 
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    const tempSelection = cloneDeep(instrumentsSelection);
    if (!tempSelection.length) {
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

  // List with instrument entries (left plugin side)
  const dragAndDropItems = instrumentsSelection.map((instrument, index, arr) => ({
    key: instrument.id,
    render: ({ dragHandleProps, isDragged, isOtherDragged }) => (
      <InstrumentEntry
        index={index}
        isDragged={isDragged}
        isOtherDragged={isOtherDragged}
        dragHandleProps={dragHandleProps}
        itemsCount={arr.length}
        canDeleteLastItem
        onMoveUp={handleMoveModelUp}
        onMoveDown={handleMoveModelDown}
        onDelete={handleDeleteModel}
        onInstrumentName={handleInstrumentNameButtonClick}
        content={content}
        updateContent={updateContent}
        className={instrument.id === selectedItem ? 'selected-item' : ''}
        />
    )
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

  // Property section (right plugin side)
  const propContainer = (
    <div className="prop-container">
      <div>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          {t('add')}
        </Button>
      </div>
      {showInstrEdit
        ? <InstrumentEditor content={content} updateContent={updateContent} />
        : null}
    </div>
  );

  return (
    <div className="EP_Educandu_Orchestration_Assistant_Editor">
      <div className="edit-wrapper">
        <div className="edit-container">
          <EditSplitter panelA={dragAndDropContainer} panelB={propContainer} />
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