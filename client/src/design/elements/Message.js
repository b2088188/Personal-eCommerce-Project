import React from 'react';
import styled from 'styled-components';
import {Span} from '../components';
import {setFlex} from '../utils';
import {Alert, AlertTitle} from '@material-ui/lab';

const Message = ({
	variant,
	alert,
	severity = 'warning',
	full,
	className
}) => {
	
	return (
	<div className = {className}>		
      <Alert variant = {variant} severity = {severity} className = "alert">
	  <Span modifiers = {['large', 'light']}>{alert}</Span>
	</Alert>
	</div>
		)
}

export default styled(Message)`
	
	.alert{
		${setFlex({x: 'center', y: 'center'})}
		width: 50%;
    	margin: 2.5rem auto;
	}
`;
