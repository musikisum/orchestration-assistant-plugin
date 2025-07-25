import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd';

export  default function ToneSlider({ content, updateContent }) {

  const { from, to } = content;

  const onChangeComplete = values => {
    const newFrom = values[0];
    const newTo = values[1];
    updateContent({ from: newFrom, to: newTo });
  };

  return (
    <Slider min={1} max={50} range defaultValue={[from, to]} tooltip onChangeComplete={onChangeComplete} />
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