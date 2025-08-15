import { Slider } from 'antd';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import OrchestrationUtilities from '../orchestration-utilities.js'; 

export default function ToneSlider({ content, updateContent }) {

  const { from = 1, to = 50 } = content;
  const [live, setLive] = useState([from, to]);

  const handleOnChange = useCallback(values => { 
    return setLive(values);
  }, []);

  const handleOnChangeComplete = useCallback(values => {
    const [newFrom, newTo] = values;
    updateContent({ from: newFrom, to: newTo });
  }, [updateContent]);

  return (
    <Slider 
      min={1} 
      max={50}
      range
      pushable={8}
      value={live} 
      allowCross={false}
      onChange={handleOnChange} 
      onChangeComplete={handleOnChangeComplete}
      tooltip={{ formatter: value => OrchestrationUtilities.tipFormatterList[value - 1] }} 
      />
  );

}

ToneSlider.propTypes = {
  updateContent: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired
};