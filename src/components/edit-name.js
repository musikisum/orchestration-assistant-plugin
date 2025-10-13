import { Input } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useClickOutside } from '../use-click-outside.js';
import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';

function EditName({ instrument, saveInstrumentInContent }) {
  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

  const containerRef = useRef(null);
  const isCustom = !!instrument?.id?.startsWith?.('custom');

  const displayName = useMemo(() => {
    if (!instrument) {
      return '';
    };
    const raw = instrument.name ?? '';
    if (isCustom) {
      return raw;
    };
    return t(raw, { defaultValue: raw });
  }, [instrument, isCustom, t]);

  const [name, setName] = useState(displayName);

  useEffect(() => {
    setName(displayName);
  }, [displayName]);

  const normalize = value => {
    return (value ?? '').trim();
  };

  const saveIfDirty = useCallback(() => {
    if (!instrument) {
      return;
    };
    if (typeof saveInstrumentInContent !== 'function') {
      return;
    }
    if (!isCustom) {
      return;
    }

    let nextName = normalize(name);
    if (nextName === '') {
      nextName = t('newInstrument');
    }
    if (nextName !== normalize(displayName)) {
      saveInstrumentInContent(null, instrument.id, { ...instrument, name: nextName });
    }
    setName(nextName);
  }, [instrument, name, displayName, saveInstrumentInContent, isCustom, t]);

  useClickOutside(containerRef, saveIfDirty);

  const handleNameChange = e => {
    if (!isCustom) {
      return;
    }
    setName(e.target.value);
  };

  const inputStyle = {
    minWidth: '100px',
    backgroundColor: isCustom ? 'white' : '#f5f5f5',
    cursor: isCustom ? 'text' : 'not-allowed',
    opacity: isCustom ? 1 : 0.8
  };

  if (!instrument) {
    return (
      <div ref={containerRef} className="prop-container-inspector-child">
        <span>Name:</span>
        <Input
          size="small"
          value=""
          disabled
          style={inputStyle}
          placeholder={t('nameInput')}
          aria-label={t('nameInput')}
          />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="prop-container-inspector-child">
      <span>Name:</span>
      <Input
        size="small"
        value={name}
        readOnly={!isCustom}
        style={inputStyle}
        onChange={handleNameChange}
        onBlur={saveIfDirty}
        onPressEnter={saveIfDirty}
        placeholder={t('nameInput')}
        aria-label={t('nameInput')}
        spellCheck={false}
        />
    </div>
  );
}

export default EditName;

EditName.propTypes = {
  instrument: PropTypes.object,
  saveInstrumentInContent: PropTypes.func
};

EditName.defaultProps = {
  instrument: null,
  saveInstrumentInContent: null
};
