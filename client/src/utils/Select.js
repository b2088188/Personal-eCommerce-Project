import React from 'react';

const Select = ({
  count,
	selectQty, 
  setSelectQty
}) => {
	

    function renderOptions(count) {
    	return [...Array(count).keys()].map(el => <option key = {el} value = {el + 1}>{el + 1}</option>)
    }

    return (
      <select value = {selectQty} onChange = {(e) => setSelectQty(e.target.value)}>
      						{renderOptions(count)}
     </select>
    	)
}

export default Select;