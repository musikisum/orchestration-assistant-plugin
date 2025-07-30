import PropTypes from 'prop-types';
import { Input, Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';

function EditableInput({ index, customInstruments, updateContent }) {
  
  const { t } = useTranslation('musikisum/educandu-plugin-gap-genius');
  const [editing, setEditing] = useState(false);
  const [inputLine, setInputLine] = useState(customInstruments[index].name);

  const handleSave = () => {
    setEditing(false);
    const trimmed = inputLine ? inputLine.trim() : '';
    setInputLine(trimmed);

    const instrumentsCopy = cloneDeep(customInstruments);
    instrumentsCopy[index].name = trimmed;
    updateContent({ customInstruments: instrumentsCopy });
  };

  const keyValueProp = editing
    ? (
      <div className='editable-input'>
        <Input
          className="text-editable-input"
          value={inputLine}
          autoFocus
          onChange={e => setInputLine(e.target.value)}
          onPressEnter={handleSave}
          onBlur={handleSave}
          />
        <Tooltip title={t('saveButtonText')}>
          <Button type="primary" icon={<CheckOutlined />} onClick={handleSave} />
        </Tooltip>
      </div>
    )
    : (
      <div className='editable-input'>
        <div className="text-editable-input-display" onClick={() => setEditing(true)}>
          {inputLine || <div style={{ color: '#aaa' }}>{}</div>}
        </div>
        <Tooltip title={t('inputButtonText')}>
          <Button type="link" icon={<EditOutlined />} onClick={() => setEditing(true)} />
        </Tooltip>
      </div>
    );

  return <div className='editable-input-container' style={{ width: '100%' }}>{keyValueProp}</div>;
}

EditableInput.propTypes = {
  index: PropTypes.number,
  customInstruments: PropTypes.array,
  updateContent: PropTypes.func
};

EditableInput.defaultProps = {
  index: null,
  customInstruments: [],
  updateContent: null,
};

export default EditableInput;