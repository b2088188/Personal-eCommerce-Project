import React from 'react';
import styled from 'styled-components';
import { Span } from '../components';
import { media } from '../utils';
import { Alert } from '@material-ui/lab';

const Message = ({ variant, text, severity = 'warning', full, className }) => {
	return (
		<Alert variant={variant} severity={severity} className={className}>
			<Span modifiers={['large', 'light']}>{text}</Span>
		</Alert>
	);
};

export default styled(Message)`
	width: 50%;
	margin: 2.5rem auto;
	display: flex;
	justify-content: center;
	align-items: center;
	align-self: flex-start;
	${media.phone(`
		width: 90%;
		`)}
`;
