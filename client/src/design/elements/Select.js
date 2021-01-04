import React, {useState} from 'react';

const Select = ({
  count,
	value = 1,
  onChange  
}) => {

    function renderOptions(count) {
    	return [...Array(count).keys()].map(el => <option key = {el} value = {el + 1}>{el + 1}</option>)
    }

    return (
      <select value = {value} onChange = {onChange} className = "select">
      						{renderOptions(count)}
     </select>
    	)
}

export default Select;