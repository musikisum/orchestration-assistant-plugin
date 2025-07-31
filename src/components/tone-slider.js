import React from 'react';
import { Slider } from 'antd';
import PropTypes from 'prop-types';
import OrchestrationUtilities from '../orchestration-utilities.js'; 

export default function ToneSlider({ content, updateContent }) {

  const { from, to } = content;

  const onChange = values => {
    const newFrom = values[0];
    const newTo = values[1];    
    updateContent({ from: newFrom, to: newTo });
  };

  return (
    <Slider 
      min={1} 
      max={50} 
      range 
      value={[from, to]} 
      tooltip={{ formatter: value => OrchestrationUtilities.tipFormatterList[value - 1] }} 
      onChange={onChange} 
      />
  );

}

ToneSlider.propTypes = {
  updateContent: PropTypes.func,
  content: PropTypes.object
};
  
ToneSlider.defaultProps = {
  updateContent: null,
  content: null
};