import React from 'react';

export default function ViolinFingeringTable() {

  const tableStyle = {
    margin: '12px auto',
    width: '90%',
    borderCollapse: 'collapse',
  };
  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '2px',
    textAlign: 'center',
  };
  const theadRowStyle = {
    backgroundColor: 'whitesmoke',
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr style={theadRowStyle}>
          <td style={thTdStyle}>Töne</td>
          <td style={thTdStyle}>1/2 Lage</td>
          <td style={thTdStyle}>1. Lage</td>
          <td style={thTdStyle}>2. Lage</td>
          <td style={thTdStyle}>3. Lage</td>
          <td style={thTdStyle}>4. Lage</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={thTdStyle}>b&apos;</td>
          <td style={thTdStyle}>1</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
        </tr>
        <tr>
          <td style={thTdStyle}>h&apos;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>1</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
        </tr>
        <tr>
          <td style={thTdStyle}>c&apos;</td>
          <td style={thTdStyle}>2</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>1</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
        </tr>
        <tr>
          <td style={thTdStyle}>c&#9839;&apos;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>2</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
        </tr>
        <tr>
          <td style={thTdStyle}>d&apos;</td>
          <td style={thTdStyle}>3</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>2</td>
          <td style={thTdStyle}>1</td>
          <td style={thTdStyle}>&nbsp;</td>
        </tr>
        <tr>
          <td style={thTdStyle}>e&#9837;&apos;/d&#9839;&apos;</td>
          <td style={thTdStyle}>4</td>
          <td style={thTdStyle}>3</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
        </tr>
        <tr>
          <td style={thTdStyle}>e&apos;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>4</td>
          <td style={thTdStyle}>3</td>
          <td style={thTdStyle}>2</td>
          <td style={thTdStyle}>1</td>
        </tr>
        <tr>
          <td style={thTdStyle}>f&apos;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>4</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
        </tr>
        <tr>
          <td style={thTdStyle}>f&#9839;&apos;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>3</td>
          <td style={thTdStyle}>2</td>
        </tr>
        <tr>
          <td style={thTdStyle}>g&apos;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>4</td>
          <td style={thTdStyle}>&nbsp;</td>
        </tr>                
        <tr>
          <td style={thTdStyle}>g&#9839;&apos;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>3</td>
        </tr>
        <tr>
          <td style={thTdStyle}>a&apos;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>&nbsp;</td>
          <td style={thTdStyle}>4</td>
        </tr>          
      </tbody>
    </table>
  );
}