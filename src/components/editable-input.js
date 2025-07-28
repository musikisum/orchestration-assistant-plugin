import PropTypes from 'prop-types';
import { Input, Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { EditOutlined, CheckOutlined, PlusOutlined } from '@ant-design/icons';

function EditableInput({ key, content, updateContent }) {

  const { t } = useTranslation('musikisum/educandu-plugin-gap-genius');

  const [editing, setEditing] = useState(false);
  const [inputLine, setInputLine] = useState('');
  const inputStyle = {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  useEffect(() => {    
    // setInputLine(line);
  }, []);

  const handleSave = () => {
    setEditing(false);
    // const temp = inputLine ? inputLine.trim() : '';
    // setInputLine(temp);
    // onSave(temp);
  };

  const handleAddPropertyButtonClick = e => {
    console.log('e:', e);
  };

  /* eslint-disable react/jsx-indent */
  const keyValueProp = editing 
    ? (
      <div style={inputStyle}>
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
      <div style={inputStyle}>
        <div className="text-editable-input-display" onClick={() => setEditing(true)}>
          {inputLine || (
            <div style={{ color: '#aaa' }}>
              {t('defaultFootnoteInputText')}
            </div>
          )}
        </div>
        <Tooltip title={t('inputButtonText')}>
          <Button type="link" icon={<EditOutlined />} onClick={() => setEditing(true)} />
        </Tooltip>
      </div>
    );
  /* eslint-enable react/jsx-indent */

  return (
    <div>
      <div className='editable-input-container' style={{ marginBottom: '12px', borderBottom: '1px solid gray' }}>
        {keyValueProp}
      </div>
      <div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAddPropertyButtonClick}
          >
          {t('addInstrument')}
        </Button>
      </div>
    </div>
  );
}

EditableInput.propTypes = {
  key: PropTypes.string,
  content: PropTypes.object,
  updateContent: PropTypes.func
};

EditableInput.defaultProps = {
  key: null,
  content: false,
  updateContent: null,
};

export default EditableInput;