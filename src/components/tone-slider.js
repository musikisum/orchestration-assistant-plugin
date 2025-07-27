import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd';

export default function ToneSlider({ content, updateContent }) {

  const { from, to } = content;
  const tipFormatterList = [
    'C,', 'D,', 'E,', 'F,', 'G,', 'A,', 'H,',
    'C', 'D', 'E', 'F', 'G', 'A', 'H',
    'c', 'd', 'e', 'f', 'g', 'a', 'h',
    'c1', 'd1', 'e1', 'f1', 'g1', 'a1', 'h1',
    'c2', 'd2', 'e2', 'f2', 'g2', 'a2', 'h2',
    'c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'h3',
    'c4', 'd4', 'e4', 'f4', 'g4', 'a4', 'h4',
    'c5'
  ];

  const onChangeComplete = values => {
    const newFrom = values[0];
    const newTo = values[1];    
    updateContent({ from: newFrom, to: newTo });
  };

  return (
    <Slider min={1} max={50} range defaultValue={[from, to]} tooltip={{ formatter: value => tipFormatterList[value - 1] }} onChangeComplete={onChangeComplete} />
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