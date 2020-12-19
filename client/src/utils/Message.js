import React from 'react';
import {Alert, AlertTitle} from '@material-ui/lab';

const Message = ({
	alert,
	severity = 'warning'
}) => {
	
	return (
      <Alert variant = "outlined" severity = {severity} className = "alert">
	  {alert}
	</Alert>
		)
}

export default Message;