import { nanoid } from 'nanoid';
import { Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import EditSplitter from './components/edit-splitter.js';
import Info from '@educandu/educandu/components/info.js';
import SelectDialog from './components/select-dialog.js';
import instrumentsProvider from './instruments-provider.js';
import InstrumentEntry from './components/instrument-entry.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import InstrumentEditor from './components/instrument-editor.js';
import { FORM_ITEM_LAYOUT } from '@educandu/educandu/domain/constants.js';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';
import ObjectWidthSlider from '@educandu/educandu/components/object-width-slider.js';
import DragAndDropContainer from '@educandu/educandu/components/drag-and-drop-container.js';
import { swapItemsAt, removeItemAt, moveItem } from '@educandu/educandu/utils/array-utils.js';

export default function OrchestrationAssistantEditor({ content, onContentChanged }) {
  const {
    width,
    instrumentsSelection
  } = content;
  
  const updateContent = newContentValues => {
    onContentChanged({ ...content, ...newContentValues });
  };
  
  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  const [selectedInstrument, setSelectedInstrment] = useState('');
  const [selectedInstrumentClass, setSelectedInstrmentClass] = useState(null);
  const [modalSelections, setModalSelections] = useState(instrumentsSelection.map(item => item.id));
  const [showInstrumentEditor, setShowInstrumentEditor] = useState(false);

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
    const id = instrumentsSelection[index].id;
    const instrIdsCopy = [...modalSelections];
    instrIdsCopy.splice(modalSelections.indexOf(id), 1);
    setModalSelections(instrIdsCopy);
    const newSelection = removeItemAt(instrumentsSelection, index);
    updateContent({ instrumentsSelection: newSelection });
  };

  // save einstrument edits
  const saveInstrumentInContent = (_event, id, instrument) => {
    if (instrument) { // leaving markdpwn input
      const list = cloneDeep(instrumentsSelection);
      const index = list.findIndex(item => item.id === instrument.id);
      if (index !== -1) {
        list[index] = instrument;        
      }
      setSelectedInstrment('');
      setShowInstrumentEditor(false);
      updateContent({ instrumentsSelection: list });
    } else { // handleInstrumentNameButtonClick
      if(id === selectedInstrument) { // deselect instrument name
        setShowInstrumentEditor(false);
        setSelectedInstrment('');
        setSelectedInstrmentClass('');
        return;
      }
      setSelectedInstrmentClass(id);
      setSelectedInstrment(id);
      setShowInstrumentEditor(true);
    }    
  };
  
  // Select instrument 
  const handleInstrumentNameButtonClick = (_event, id, instrument) => {
    saveInstrumentInContent(null, id, instrument);
  };

  // Modal dialog for instrument selection 
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    const newSelection = instrumentsProvider.loadInstrumentsFromIds(modalSelections);
    setSelectedInstrment('');
    updateContent({ instrumentsSelection: newSelection });
    setSelectedInstrmentClass('');
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

  const getInstrumentCopy = id => {
    const current = instrumentsSelection.find(item => item.id === id);
    return instrumentsProvider.getInstrumentCopy(current);
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
        onInstrumentName={event => handleInstrumentNameButtonClick(event, instrument.id)}
        content={content}
        updateContent={updateContent}
        className={instrument.id === selectedInstrumentClass ? 'selected-item' : ''}
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
      <div className='prop-container-header'>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          {t('add')}
        </Button>
      </div>
      {showInstrumentEditor
        ? <InstrumentEditor 
            instrument={getInstrumentCopy(selectedInstrument)} 
            saveInstrumentInContent={saveInstrumentInContent} 
            />
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
        modalSelections={modalSelections}
        setModalSelections={setModalSelections}
        />
    </div>
  );
}

OrchestrationAssistantEditor.propTypes = {
  ...sectionEditorProps
};