import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import cloneDeep from '@educandu/educandu/utils/clone-deep.js';
import OrchestrationUtilities from '../orchestration-utilities.js'; 
import { Button, Collapse, Tooltip, Slider } from 'antd';
import ColorPicker from '@educandu/educandu/components/color-picker.js';
import MarkdownInput from '@educandu/educandu/components/markdown-input.js';
import DeleteIcon from '@educandu/educandu/components/icons/general/delete-icon.js';
import MoveUpIcon from '@educandu/educandu/components/icons/general/move-up-icon.js';
import MoveDownIcon from '@educandu/educandu/components/icons/general/move-down-icon.js';
import { confirmDeleteItem } from '@educandu/educandu/components/confirmation-dialogs.js';

export default function InstrumentEntry({
  index,
  dragHandleProps,
  isDragged,
  isOtherDragged,
  itemsCount,
  canDeleteLastItem,
  onMoveUp,
  onMoveDown,
  onDelete,
  onInstrumentName,
  content,
  updateContent,
  className
}) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  const instrumentsSelection = cloneDeep(content.instrumentsSelection);

  const handleActionButtonWrapperClick = (event, actionButton) => {
    if (actionButton.disabled) {
      event.stopPropagation();
    }
  };

  const handleActionButtonClick = (event, actionButton) => {
    event.stopPropagation();
    switch (actionButton.key) {
      case 'moveUp':
        return onMoveUp(index);
      case 'moveDown':
        return onMoveDown(index);
      case 'delete':
        return confirmDeleteItem(t, instrumentsSelection[index].name, () => onDelete(index));
      default:
        return null;
    }
  };

  const actionButtons = [];
  if (onMoveUp) {
    actionButtons.push({
      key: 'moveUp',
      title: null,
      icon: <MoveUpIcon />,
      disabled: index === 0
    });
  }
  if (onMoveDown) {
    actionButtons.push({
      key: 'moveDown',
      title: null,
      icon: <MoveDownIcon />,
      disabled: index === itemsCount - 1
    });
  }
  if (onDelete) {
    const isDeleteDisabled = !canDeleteLastItem && itemsCount <= 1;
    actionButtons.push({
      key: 'delete',
      title: t('common:delete'),
      icon: <DeleteIcon />,
      danger: !isDeleteDisabled,
      disabled: isDeleteDisabled
    });
  }

  const renderActionButtons = () => {
    if (!actionButtons.length) {
      return null;
    }
    return (
      <div className='dadActionButtons'>
        {actionButtons.map(actionButton => (
          <div key={actionButton.key} onClick={event => handleActionButtonWrapperClick(event, actionButton)}>
            <Tooltip title={actionButton.title}>
              <Button
                type="text"
                size="small"
                icon={actionButton.icon}
                disabled={actionButton.disabled}
                className={classNames('u-action-button', { 'u-danger-action-button': actionButton.danger })}
                onClick={event => handleActionButtonClick(event, actionButton)}
                />
            </Tooltip>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`instrument-entry ${className}`} {...dragHandleProps}>
      <div 
        className='instrumen-name' 
        onClick={e => onInstrumentName(e, instrumentsSelection[index].id)}
        >
        {t(instrumentsSelection[index].name)}
      </div>
      {renderActionButtons()}
    </div>
  );
}

InstrumentEntry.propTypes = {
  canDeleteLastItem: PropTypes.bool,
  extraActionButtons: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node,
    danger: PropTypes.bool,
    disabled: PropTypes.bool,
  })),
  index: PropTypes.number,
  dragHandleProps: PropTypes.object,
  isDragged: PropTypes.bool,
  isOtherDragged: PropTypes.bool,
  itemsCount: PropTypes.number,
  onDelete: PropTypes.func,
  onExtraActionButtonClick: PropTypes.func,
  onMoveDown: PropTypes.func,
  onMoveUp: PropTypes.func,
  onInstrumentName: PropTypes.func,
  content: PropTypes.object,
  updateContent: PropTypes.func
};

InstrumentEntry.defaultProps = {
  canDeleteLastItem: false,
  extraActionButtons: [],
  index: 0,
  dragHandleProps: null,
  isDragged: false,
  isOtherDragged: false,
  itemsCount: 1,
  onDelete: null,
  onExtraActionButtonClick: () => {},
  onMoveDown: null,
  onMoveUp: null,
  onInstrumentName: null,
  content: null,
  updateContent: null
};