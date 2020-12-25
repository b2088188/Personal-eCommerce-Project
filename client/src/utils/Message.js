import React from 'react';
import {Alert, AlertTitle} from '@material-ui/lab';

const Message = ({
	variant,
	alert,
	severity = 'warning'
}) => {
	
	return (
	<div className = 'alert__container'>		
      <Alert variant = {variant} severity = {severity} className = "alert">
	  <span className = "alert__text">{alert}</span>
	</Alert>
	</div>
		)
}

export default Message;