import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Input, Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import EditableInput from './editable-input.js';
import React, { useState, useEffect, useRef } from 'react';
import { EditOutlined, CheckOutlined, PlusOutlined } from '@ant-design/icons';
import DragAndDropContainer from '@educandu/educandu/components/drag-and-drop-container.js';

function CustomInstrumentTemplate({ key, content, updateContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-gap-genius');
  const droppableIdRef = useRef(nanoid(10));

  const template = <EditableInput key={key} content={content} updateContent={updateContent} />;

  // const dragAndDropItems = customInstruments.map((instrument, index, arr) => ({
  //   key: instrument.key,
  //   render: ({ dragHandleProps, isDragged, isOtherDragged }) => 
  //     (<CustomInstrument 
  //       index={index}
  //       dragHandleProps={dragHandleProps}
  //       isDragged={isDragged} 
  //       isOtherDragged={isOtherDragged} 
  //       itemsCount={arr.length}
  //       canDeleteLastItem
  //       onMoveUp={handleMoveModelUp}
  //       onMoveDown={handleMoveModelDown}
  //       onDelete={handleDeleteModel}
  //       content={content}
  //       updateContent={updateContent}
  //       />)
  // }));

  // const handleItemMove = (fromIndex, toIndex) => {
  //   const newCustomInstruments = moveItem(customInstruments, fromIndex, toIndex);
  //   updateContent({ customInstruments: newCustomInstruments });
  // };

  return (
    <div>
      {/* <DragAndDropContainer
        droppableId={droppableIdRef.current} 
        items={dragAndDropItems} 
        onItemMove={handleItemMove}
        /> */}
      {template}
    </div>
  );
}

CustomInstrumentTemplate.propTypes = {
  key: PropTypes.string,
  content: PropTypes.object,
  updateContent: PropTypes.func
};

CustomInstrumentTemplate.defaultProps = {
  key: null,
  content: null,
  updateContent: null,
};

export default EditableInput;
