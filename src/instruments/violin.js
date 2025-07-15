/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';

export default function Violin() {

  const [isVisible, setIsVisible] = useState(false);

  const onInstrumentClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className='instrument-strings' style={{ gridColumn: '20/45' }}>
      <div onClick={onInstrumentClick} style={{ cursor: 'pointer' }}>
        Violine
      </div>
      {isVisible
        ? <div className="instrument-annotations">
            <p><b>Stimmung:</b> g-d<sup>1</sup>-a<sup>1</sup>-e<sup>2</sup></p>
            <p><b>Griffbrettgrenze:</b> E-Saite = g4, im Orchester Umfang bis c4 gut möglich</p>
          </div>
        : null}
    </div>);
}