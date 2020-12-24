import React from 'react';

const FormRadio = ({
	name,
	value,
	type,
	register,
	checked	
}) => {
	
	return (
      <div className = "form__group--radio">
		<input type = {type} name = {name} id = {value} value = {value} className = "form__input" ref = {register} checked = {checked} />
		<label htmlFor = {value} className = "form__label">{value[0].toUpperCase() + value.slice(1)}</label>
	  </div>
		)
}

export default FormRadio;