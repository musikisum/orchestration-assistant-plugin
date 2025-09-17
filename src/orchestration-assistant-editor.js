import { nanoid } from 'nanoid';
import { Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import EditName from './components/edit-name.js';
import EditColor from './components/edit-color.js';
import ToneSlider from './components/tone-slider.js';
import updateValidation from './update-validation.js';
import BeforeAfter from './components/before-after.js';
import EditSplitter from './components/edit-splitter.js';
import Info from '@educandu/educandu/components/info.js';
import SelectDialog from './components/select-dialog.js';
import React, { useRef, useState, useEffect } from 'react';
import EditSetSelect from './components/edit-set-select.js';
import instrumentsProvider from './instruments-provider.js';
import InstrumentEntry from './components/instrument-entry.js';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import EditRangeSliders from './components/edit-range-sliders.js';
import { FORM_ITEM_LAYOUT } from '@educandu/educandu/domain/constants.js';
import { sectionEditorProps } from '@educandu/educandu/ui/default-prop-types.js';
import InstrumentMarkdownEditor from './components/instrument-markdown-editor.js';
import ObjectWidthSlider from '@educandu/educandu/components/object-width-slider.js';
import { PlusOutlined, UnorderedListOutlined, MinusOutlined } from '@ant-design/icons';
import DeleteCustomInstrumentButton from './components/delete-custom-instrument-button.js';
import DragAndDropContainer from '@educandu/educandu/components/drag-and-drop-container.js';
import { swapItemsAt, removeItemAt, moveItem } from '@educandu/educandu/utils/array-utils.js';

export default function OrchestrationAssistantEditor({ content, onContentChanged }) {

  const { width, instrumentsSelection, customInstrumentsCache } = updateValidation.checkContentAfterUpdate(content);

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
  const handleMovItemUp = index => {
    const newSelection = swapItemsAt(instrumentsSelection, index, index - 1);
    updateContent({ instrumentsSelection: newSelection });
  };
  const handleMoveItemDown = index => {
    const newSelection = swapItemsAt(instrumentsSelection, index, index + 1);
    updateContent({ instrumentsSelection: newSelection });
  };
  const handleDeleteItem = index => {
    const id = instrumentsSelection[index].id;
    const instrIdsCopy = [...modalSelections];
    instrIdsCopy.splice(modalSelections.indexOf(id), 1);
    setModalSelections(instrIdsCopy);
    const newSelection = removeItemAt(instrumentsSelection, index);
    setShowInstrumentEditor(false);
    updateContent({ instrumentsSelection: newSelection });
  };

  const resetInstrumentListInSplitter = () => {
    setSelectedInstrument('');
    setShowInstrumentEditor(false);
    setSelectedInstrumentClass('');
  };

  // save instrument edits
  const saveInstrumentInContent = (_event, id, instrument) => {
    const isCustom = id ? id.startsWith('custom') : instrument.id.startsWith('custom');
    // when instrument editor loses focus
    if (instrument) {
      const list = cloneDeep(instrumentsSelection);
      const index = list.findIndex(item => item.id === instrument.id);
      if (index > -1) {
        list[index] = instrument;
      }
      let nextCache = customInstrumentsCache;
      if (isCustom) {
        const ciIndex = customInstrumentsCache.findIndex(item => item.id === instrument.id);
        if (ciIndex > -1) {
          const ciList = cloneDeep(customInstrumentsCache);
          ciList[ciIndex] = instrument;
          nextCache = ciList;
        }
      }
      const payload = { instrumentsSelection: list };
      if (isCustom && nextCache !== customInstrumentsCache) {
        payload.customInstrumentsCache = nextCache;
      }
      updateContent(payload);
      return;
    }
    // deselect instrument if instrument is null 
    if (id === selectedInstrument) {
      resetInstrumentListInSplitter();
      return;
    }
    setSelectedInstrumentClass(id);
    setSelectedInstrument(id);
    setShowInstrumentEditor(true);
  };
  
  // Select instrument 
  const handleInstrumentNameButtonClick = (_event, id, instrument) => {
    saveInstrumentInContent(null, id, instrument);
  };
  const handleSetTuttiClick = () => {
    updateContent({ instrumentsSelection: instrumentsProvider.loadInstrumentsFromNames(['tutti']) });
  };  
  const handleSetTactetClick = () => {
    resetInstrumentListInSplitter();
    updateContent({ instrumentsSelection: [] });
  };
  const handleInstrumentSetSelect = set => {
    setSelectedInstrument('');
    updateContent({ instrumentsSelection: instrumentsProvider.loadInstrumentsFromIds(set, instrumentsSelection) });
  };
  const handleEditChangeSliders = instrument => {
    //TODO: Hier muss noch die CustomList synchronisiert werden
    const clonedSelection = cloneDeep(instrumentsSelection);
    const index = clonedSelection.findIndex(item => item.id === instrument.id);
    if (index > -1) {
      clonedSelection[index] = instrument;
    } else {
      clonedSelection.push(instrument);
    }
    updateContent({ instrumentsSelection: clonedSelection });
  };

  // Handle custom instruments
  const handleNewCustomInstrumentClick = () => {
    const customInstrument = instrumentsProvider.getDefaultInstrument();
    const list = cloneDeep(instrumentsSelection);
    list.push(customInstrument);
    const customList = cloneDeep(customInstrumentsCache);
    customList.push(customInstrument);
    updateContent({ instrumentsSelection: list, customInstrumentsCache: customList });
  };
  const handleCustomInstrumentDelete = instrument => {
    if(instrument) {
      const customList = customInstrumentsCache.filter(item => item.id !== instrument.id);
      const list = instrumentsSelection.filter(item => item.id !== instrument.id);
      updateContent({ instrumentsSelection: list, customInstrumentsCache: customList });
      setShowInstrumentEditor(false);
      setSelectedInstrument('');
      setSelectedInstrumentClass('');
    }
  };

  // Modal dialog for instrument selection 
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleModalOk = () => {
    const cachedInstruments = customInstrumentsCache.filter(item => item.id.startsWith('custom'));
    const customInstr = modalSelections
      .map(id => cachedInstruments.find(instr => instr.id === id))
      .filter(Boolean);
    const newSelection = instrumentsProvider.loadInstrumentsFromIds(modalSelections, instrumentsSelection);
    newSelection.push(...customInstr);
    resetInstrumentListInSplitter();
    updateContent({ instrumentsSelection: newSelection });
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

  const getInstrumentById = id => {
    return instrumentsSelection.find(item => item.id === id);
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
        onMoveUp={handleMovItemUp}
        onMoveDown={handleMoveItemDown}
        onDelete={handleDeleteItem}
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
        <div className='editor-top-info'><Info tooltip={t('selectionInfo')} /></div>
        <Button type="primary" icon={<UnorderedListOutlined />} onClick={() => setOpen(true)}>
          {t('addButton')}
        </Button>
        <Button type="primary" color='#dee9bf' icon={<PlusOutlined />} onClick={handleSetTuttiClick}>
          {t('tuttiButton')}
        </Button>
        <Button type="primary" color='' icon={<MinusOutlined />} onClick={handleSetTactetClick}>
          {t('tacetButton')}
        </Button>
        <EditSetSelect 
          modalSelections={modalSelections} 
          handleInstrumentSetSelect={handleInstrumentSetSelect} 
          />
        <Button type="primary" color='' icon={<PlusOutlined />} onClick={handleNewCustomInstrumentClick}>
          {t('newInstrumentButton')}
        </Button>
      </div>
      {showInstrumentEditor && selectedInstrument
        ? (
          <React.Fragment>
            <div className='prop-container-inspector'>
              <EditName 
                instrument={getInstrumentById(selectedInstrument)}
                saveInstrumentInContent={saveInstrumentInContent} 
                />
              <EditColor
                instrument={getInstrumentById(selectedInstrument)}
                saveInstrumentInContent={saveInstrumentInContent}
                />
              <BeforeAfter 
                instrument={getInstrumentById(selectedInstrument)} 
                saveInstrumentInContent={saveInstrumentInContent} 
                />
              { selectedInstrument.startsWith('custom')
                ? <DeleteCustomInstrumentButton
                    instrument={getInstrumentById(selectedInstrument)}
                    deleteCustomInstrument={handleCustomInstrumentDelete}
                    />
                : null}
            </div>
            <div className='prop-container-slider'>
              <EditRangeSliders
                instrument={getInstrumentById(selectedInstrument)} 
                saveSliderData={handleEditChangeSliders}
                />
            </div>
            <InstrumentMarkdownEditor
              instrument={getInstrumentById(selectedInstrument)}
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
        onOk={handleModalOk}
        onCancel={() => setOpen(false)}
        modalSelections={modalSelections}
        setModalSelections={setModalSelections}
        instrumentsSelection={instrumentsSelection}
        customInstrumentsCache={customInstrumentsCache}
        />
    </div>
  );
}

OrchestrationAssistantEditor.propTypes = {
  ...sectionEditorProps
};