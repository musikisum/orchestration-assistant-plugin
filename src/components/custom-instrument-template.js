import PropTypes from 'prop-types';
import { Input, Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import EditableInput from './editable-input.js';
import React, { useState, useEffect } from 'react';
import { EditOutlined, CheckOutlined, PlusOutlined } from '@ant-design/icons';
import DragAndDropContainer from '@educandu/educandu/components/drag-and-drop-container.js';

function CustomInstrumentTemplate({ key, content, updateContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-gap-genius');

  const template = <EditableInput key={key} content={content} updateContent={updateContent} />;

  return (
    <div>
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
