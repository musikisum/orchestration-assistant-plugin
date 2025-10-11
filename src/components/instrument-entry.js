import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
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
  className
}) {

  const { t } = useTranslation('musikisum/educandu-plugin-orchestration-assistant');
  const instrumentsSelection = content.instrumentsSelection;
  const item = instrumentsSelection[index];

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
        if (!item) {
          return null;
        }
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

  return (
    <div
      className={classNames('instrument-entry', className, { 'is-dragged': isDragged, 'is-other-dragged': isOtherDragged }
      )}
      {...dragHandleProps}
      >
      <div 
        className='instrument-name' 
        onClick={e => {
          if (item) {
            onInstrumentName(e, item.id);
          }
        }}
        >
        {item ? t(item.name) : ''}
      </div>
      <div className="dadActionButtons">
        {actionButtons.map(actionButton => (
          <div
            key={actionButton.key}
            onClick={event => handleActionButtonWrapperClick(event, actionButton)}
            >
            <Tooltip title={actionButton.title}>
              <Button
                type="text"
                size="small"
                icon={actionButton.icon}
                disabled={actionButton.disabled || isDragged || isOtherDragged}
                className={classNames('u-action-button', {
                  'u-danger-action-button': actionButton.danger
                })}
                onClick={event => handleActionButtonClick(event, actionButton)}
                />
            </Tooltip>
          </div>
        ))}
      </div>
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
  className: PropTypes.string
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
  className: ''
};