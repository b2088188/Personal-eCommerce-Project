import React from 'react';

const FormGroup = ({
	name,
	type,
	register	
}) => {
	
	return (
      <div className = "form__group">
		<label  className = "form__label">{name[0].toUpperCase() + name.slice(1)}</label>
		<input type = {type} name = {name} className = "form__input" ref = {register} />
	  </div>
		)
}

export default FormGroup;