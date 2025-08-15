import { nanoid } from 'nanoid';
import { Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import EditName from './components/edit-name.js';
import EditColor from './components/edit-color.js';
import ToneSlider from './components/tone-slider.js';
import EditSplitter from './components/edit-splitter.js';
import Info from '@educandu/educandu/components/info.js';
import SelectDialog from './components/select-dialog.js';
import React, { useRef, useState, useEffect } from 'react';
import EditSetSelect from './components/edit-set-select.js';
import instrumentsProvider from './instruments-provider.js';
import InstrumentEntry from './components/instrument-entry.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import InstrumentEditor from './components/instrument-editor.js';
import EditRangeSliders from './components/edit-range-sliders.js';
import { FORM_ITEM_LAYOUT } from '@educandu/educandu/domain/constants.js';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';
import ObjectWidthSlider from '@educandu/educandu/components/object-width-slider.js';
import { PlusOutlined, UnorderedListOutlined, MinusOutlined } from '@ant-design/icons';
import DragAndDropContainer from '@educandu/educandu/components/drag-and-drop-container.js';
import { swapItemsAt, removeItemAt, moveItem } from '@educandu/educandu/utils/array-utils.js';

export default function OrchestrationAssistantEditor({ content, onContentChanged }) {

  const { width, instrumentsSelection } = content;

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  const updateContent = newContentValues => {
    onContentChanged({ ...content, ...newContentValues });
  };  

  const [selectedInstrument, setSelectedInstrument] = useState('');
  const [selectedInstrumentClass, setSelectedInstrumentClass] = useState(null);
  const [modalSelections, setModalSelections] = useState(instrumentsSelection.map(item => item.id));
  const [showInstrumentEditor, setShowInstrumentEditor] = useState(false);

  useEffect(() => {
    setModalSelections(instrumentsSelection.map(item => item.id));
  }, [instrumentsSelection]);

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
    setShowInstrumentEditor(false);
  };

  // save einstrument edits
  const saveInstrumentInContent = (_event, id, instrument) => {
    if (instrument) { // leaving markdown input
      const list = cloneDeep(instrumentsSelection);
      const index = list.findIndex(item => item.id === instrument.id);
      if (index !== -1) {
        list[index] = instrument;        
      }
      updateContent({ instrumentsSelection: list });
    } else { // handleInstrumentNameButtonClick
      if(id === selectedInstrument) { // deselect instrument name
        setShowInstrumentEditor(false);
        setSelectedInstrument('');
        setSelectedInstrumentClass('');
        return;
      }
      setSelectedInstrumentClass(id);
      setSelectedInstrument(id);
      setShowInstrumentEditor(true);
    }    
  };
  
  // Select instrument 
  const handleInstrumentNameButtonClick = (_event, id, instrument) => {
    saveInstrumentInContent(null, id, instrument);
  };
  const handleSetTuttiClick = () => {
    updateContent({ instrumentsSelection: instrumentsProvider.loadInstrumentsFromNames(['tutti']) });
  };  
  const handleSetTactetClick = () => {
    updateContent({ instrumentsSelection: [] });
  };
  const handleInstrumentSetSelect = set => {
    updateContent({ instrumentsSelection: instrumentsProvider.loadInstrumentsFromIds(set) });
  };
  const handleEditChangeSliders = instrument => {
    const clonedSelection = cloneDeep(instrumentsSelection);
    const index = clonedSelection.findIndex(item => item.id === instrument.id);
    if (index > -1) {
      clonedSelection[index] = instrument;
    } else {
      clonedSelection.push(instrument);
    }
    updateContent({ instrumentsSelection: clonedSelection });
  };

  const handleNewInstrumentClick = () => {
    const customInstrument = instrumentsProvider.getInstrumentCopy();
    const list = cloneDeep(instrumentsSelection);
    list.push(customInstrument);
    updateContent({ instrumentsSelection: list });
  };

  // Modal dialog for instrument selection 
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    const newSelection = instrumentsProvider.loadInstrumentsFromIds(modalSelections);
    setSelectedInstrument('');
    updateContent({ instrumentsSelection: newSelection });
    setSelectedInstrumentClass('');
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
        <div style={{ marginLeft: '12px' }}><Info tooltip={t('selectionInfo')} /></div>        
        <Button type="primary" icon={<UnorderedListOutlined />} onClick={() => setOpen(true)}>
          {t('addButton')}
        </Button>
        <Button type="primary" color='#dee9bf' icon={<PlusOutlined />} onClick={handleSetTuttiClick}>
          {t('tuttiButton')}
        </Button>
        <Button type="primary" color='' icon={<MinusOutlined />} onClick={handleSetTactetClick}>
          {t('tacetButton')}
        </Button>
        <EditSetSelect modalSelections={modalSelections} handleInstrumentSetSelect={handleInstrumentSetSelect} />
        <Button type="primary" color='' icon={<PlusOutlined />} onClick={handleNewInstrumentClick}>
          {t('newInstrumentButton')}
        </Button>
      </div>
      {showInstrumentEditor
        ? (
          <React.Fragment>
            <div className='prop-container-inspector'>
              <EditName 
                instrument={getInstrumentCopy(selectedInstrument)}
                saveInstrumentInContent={saveInstrumentInContent} 
                />
              <EditColor
                instrument={getInstrumentCopy(selectedInstrument)}
                saveInstrumentInContent={saveInstrumentInContent}
                />
            </div>
            <div className='prop-container-slider'>
              <EditRangeSliders
                instrument={getInstrumentCopy(selectedInstrument)} 
                saveSliderData={handleEditChangeSliders} 
                />
            </div>
            <InstrumentEditor
              instrument={getInstrumentCopy(selectedInstrument)}
              saveInstrumentInContent={saveInstrumentInContent}
              />
          </React.Fragment>
        )
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
            label={<Info tooltip={t('rangeTt')}>{t('range')}</Info>} 
            {...FORM_ITEM_LAYOUT}
            >               
            <ToneSlider content={content} updateContent={updateContent} />
          </Form.Item>
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