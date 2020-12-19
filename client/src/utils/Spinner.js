import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = ({
	classStyle,
	color = '#333'
}) => {
	
	return (
      <CircularProgress style = {{color}} className = 'spinner' />
		)
}

export default Spinner;
