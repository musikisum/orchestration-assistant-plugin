import { Input } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useClickOutside } from '../use-click-outside.js';
import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';

function EditName({ instrument, saveInstrumentInContent }) {
  const { t, i18n } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');

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
    return i18n.exists(raw) ? t(raw) : raw;
  }, [instrument, isCustom, i18n, t]);

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
    if (!saveInstrumentInContent) {
      return;
    }
    if (normalize(name) !== normalize(displayName)) {
      saveInstrumentInContent(null, instrument.id, { ...instrument, name });
    }
  }, [instrument, name, displayName, saveInstrumentInContent]);

  useClickOutside(containerRef, saveIfDirty);

  const handleNameChange = e => {
    setName(e.target.value);
  };

  if (!instrument) {
    return (
      <div ref={containerRef} className="prop-container-inspector-child">
        <span>Name:</span>
        <Input
          size="small"
          value=""
          disabled
          style={{ minWidth: '100px' }}
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
        style={{ minWidth: '100px' }}
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
