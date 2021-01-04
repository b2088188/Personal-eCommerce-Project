import React from 'react';

const Options = ({
	options
}) => {

	if(typeof options === 'number')
	return [...Array(options).keys()].map(el => <option key = {el} value = {el + 1}>{el + 1}</option>)
	return (
		options.map(el => <option key = {el.value} value = {el.value}>{el.text}</option>)
		)
}

export default Options;