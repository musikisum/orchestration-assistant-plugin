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

  // const [modalSelections, setModalSelections] = useState(instrumentsSelection.map(item => item.id));
  const [modalSelections, setModalSelections] = useState(instrumentsSelection.map(i => i.id));
  useEffect(() => {
    setModalSelections(instrumentsSelection.map(i => i.id));
  }, [instrumentsSelection]);

  const [selectedInstrument, setSelectedInstrument] = useState('');
  const [selectedInstrumentClass, setSelectedInstrumentClass] = useState(null);
  const [showInstrumentEditor, setShowInstrumentEditor] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Drag & Drop
  const droppableIdRef = useRef(nanoid(10)); 
  const handleItemMove = (fromIndex, toIndex) => {
    const newSelection = moveItem(instrumentsSelection, fromIndex, toIndex);
    updateContent({ instrumentsSelection: newSelection });
    setModalSelections(newSelection.map(i => i.id));
  };
  const handleMovItemUp = index => {
    const newSelection = swapItemsAt(instrumentsSelection, index, index - 1);
    updateContent({ instrumentsSelection: newSelection });
    setModalSelections(newSelection.map(i => i.id));
  };
  const handleMoveItemDown = index => {
    const newSelection = swapItemsAt(instrumentsSelection, index, index + 1);
    updateContent({ instrumentsSelection: newSelection });
    setModalSelections(newSelection.map(i => i.id));
  };

  // Reset & Sync
  const resetInstrumentSelectionInSplitter = () => {
    setSelectedInstrument('');
    setShowInstrumentEditor(false);
    setSelectedInstrumentClass('');
  };
  // Delete item from instrumentSelection and update modalselection
  const handleDeleteItem = index => {
    if (index < 0 || index >= instrumentsSelection.length) {
      return;
    }
    const id = instrumentsSelection[index]?.id;
    const newSelection = removeItemAt(instrumentsSelection, index);
    if (id) {
      setModalSelections(prev => {
        const pos = prev.indexOf(id);
        if (pos === -1) {
          return newSelection.map(i => i.id);;
        }
        const next = prev.slice();
        next.splice(pos, 1);
        return next;
      });
    } else {
      setModalSelections(newSelection.map(i => i.id));
    }
    if (selectedInstrument === id) {
      resetInstrumentSelectionInSplitter();
    } else {
      setShowInstrumentEditor(false);
    }
    updateContent({ instrumentsSelection: newSelection });
  };

  // save instrument properties
  const saveInstrumentInContent = (_event, id, instrument) => {
    const targetId = instrument?.id ?? id;
    const isCustom = !!targetId?.startsWith('custom');
    // when instrument editor looses focus
    if (instrument) {
      const list = cloneDeep(instrumentsSelection);
      const idx = list.findIndex(item => item.id === instrument.id);
      if (idx > -1) {
        list[idx] = instrument;
      }
      const payload = { instrumentsSelection: list };
      if (isCustom) {
        const ciIdx = customInstrumentsCache.findIndex(item => item.id === instrument.id);
        if (ciIdx > -1) {
          const ciList = cloneDeep(customInstrumentsCache);
          ciList[ciIdx] = instrument;
          payload.customInstrumentsCache = ciList;
        } else {
          payload.customInstrumentsCache = [...customInstrumentsCache, instrument];
        }
      }
      updateContent(payload);
      return;
    }
    if (id === selectedInstrument) {
      resetInstrumentSelectionInSplitter();
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

  // Helper function for tutti and tacet buttons
  const applySelection = ids => {
    const uniqueIds = Array.from(new Set(ids)).filter(Boolean);
    const resolved = uniqueIds.map(id => {
      // 1. from current instrument selection
      const fromSel = instrumentsSelection.find(it => it.id === id);
      if (fromSel) {
        return cloneDeep(fromSel);
      }
      // 2) from provider defaults
      const fromDefault = instrumentsProvider.loadInstrumentsFromIds([id]);
      if (fromDefault.length && fromDefault[0]) {
        return fromDefault[0];
      }
      // 3) from custom cache
      return customInstrumentsCache.find(ci => ci.id === id) || null;
    }).filter(Boolean);
    const next = instrumentsProvider.uniqueById(resolved);
    updateContent({ instrumentsSelection: next });
    setModalSelections(next.map(i => i.id));
  };

  // Set tutti instruments from instrument provider (default) 
  const handleSetTuttiClick = () => {
    resetInstrumentSelectionInSplitter();
    const tutti = instrumentsProvider.loadInstrumentsFromNames(['tutti']);
    applySelection(tutti.map(item => item.id));
  };

  const handleSetTactetClick = () => {
    resetInstrumentSelectionInSplitter();
    applySelection([]);
  };

  const handleInstrumentSetSelect = set => {
    setSelectedInstrument('');
    applySelection(set);
  };

  // Save range in instrument
  const handleEditRangeSlider = instrument => {
    const clonedSelection = cloneDeep(instrumentsSelection);
    const index = clonedSelection.findIndex(item => item.id === instrument.id);
    if (index === -1) {
      return;
    }
    clonedSelection[index] = instrument;
    const payload = { instrumentsSelection: clonedSelection };
    if (instrument.id?.startsWith('custom')) {
      const ciIndex = customInstrumentsCache.findIndex(ci => ci.id === instrument.id);
      if (ciIndex > -1) {
        const ciList = cloneDeep(customInstrumentsCache);
        ciList[ciIndex] = instrument;
        payload.customInstrumentsCache = ciList;
      } else {
        payload.customInstrumentsCache = [...customInstrumentsCache, instrument];
      }
    }
    updateContent(payload);
  };

  // Add new custom instruments in instrumentsSelection and customInstrumentsCache
  const handleNewCustomInstrumentClick = () => {
    const customInstrument = instrumentsProvider.getDefaultInstrument(null, t('newInstrument'));
    const list = [...instrumentsSelection, customInstrument];
    const customList = [...customInstrumentsCache, customInstrument];
    updateContent({ instrumentsSelection: list, customInstrumentsCache: customList });
    setModalSelections(list.map(i => i.id));
  };
  // Delete custom instruments from instrumentsSelection and customInstrumentsCache
  const handleCustomInstrumentDelete = instrument => {
    if (!instrument) {
      return;
    }
    const customList = customInstrumentsCache.filter(item => item.id !== instrument.id);
    const list = instrumentsSelection.filter(item => item.id !== instrument.id);
    updateContent({ instrumentsSelection: list, customInstrumentsCache: customList });
    setModalSelections(list.map(i => i.id));
    resetInstrumentSelectionInSplitter();
  };

  // Modal dialog for instrument selection 
  const handleModalOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 300);
  };

  const handleModalSelectionsChange = nextIds => {
    applySelection(Array.from(new Set(nextIds)));
  };

  // Plugin width
  const handleWidthChange = value => {
    updateContent({ width: value });
  };

  const getInstrumentByIdFromInstrumentsSelection = id => {
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
                instrument={getInstrumentByIdFromInstrumentsSelection(selectedInstrument)}
                saveInstrumentInContent={saveInstrumentInContent} 
                />
              <EditColor
                instrument={getInstrumentByIdFromInstrumentsSelection(selectedInstrument)}
                saveInstrumentInContent={saveInstrumentInContent}
                />
              <BeforeAfter 
                instrument={getInstrumentByIdFromInstrumentsSelection(selectedInstrument)} 
                saveInstrumentInContent={saveInstrumentInContent} 
                />
              { selectedInstrument.startsWith('custom')
                ? <DeleteCustomInstrumentButton
                    instrument={getInstrumentByIdFromInstrumentsSelection(selectedInstrument)}
                    deleteCustomInstrument={handleCustomInstrumentDelete}
                    />
                : null}
            </div>
            <div className='prop-container-slider'>
              <EditRangeSliders
                instrument={getInstrumentByIdFromInstrumentsSelection(selectedInstrument)} 
                saveSliderData={handleEditRangeSlider}
                />
            </div>
            <InstrumentMarkdownEditor
              instrument={getInstrumentByIdFromInstrumentsSelection(selectedInstrument)}
              saveInstrumentInContent={saveInstrumentInContent}
              language={t('language')}
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
        instrumentsSelection={instrumentsSelection}
        customInstrumentsCache={customInstrumentsCache}
        onSelectionsChange={handleModalSelectionsChange}
        />
    </div>
  );
}

OrchestrationAssistantEditor.propTypes = {
  ...sectionEditorProps
};