import React from 'react';
import { Splitter } from 'antd';
import PropTypes from 'prop-types';

export default function EditSplitter({ panelA, panelB }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Splitter layout="horizontal" style={{ width: '100%', height: '100%' }}>
        <Splitter.Panel defaultSize='25%' resizable>
          {panelA}
        </Splitter.Panel>
        <Splitter.Panel defaultSize='75%' resizable>
          {panelB}
        </Splitter.Panel>
      </Splitter>
    </div>
  );
}

EditSplitter.propTypes = {
  panelA: PropTypes.object,
  panelB: PropTypes.object
};

EditSplitter.defaultProps = {
  panelA: null,
  panelB: null
};