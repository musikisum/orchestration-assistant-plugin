import React from 'react';
import { Splitter } from 'antd';
import PropTypes from 'prop-types';

export default function EditSplitter({ panelA, panelB }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Splitter layout="horizontal" style={{ width: '100%', height: '100%' }}>
        <Splitter.Panel defaultSize='25%' min='20%' resizable>
          {panelA ?? <div />}
        </Splitter.Panel>
        <Splitter.Panel defaultSize='75%' min='50%' resizable>
          {panelB ?? <div />}
        </Splitter.Panel>
      </Splitter>
    </div>
  );
}

EditSplitter.propTypes = {
  panelA: PropTypes.node,
  panelB: PropTypes.node
};

EditSplitter.defaultProps = {
  panelA: null,
  panelB: null
};