import React from 'react';
import styled from 'styled-components';
import { Span } from 'design/components';
import { media, setFlex } from 'design/utils';
import { Alert } from '@material-ui/lab';
import { Fade } from '@material-ui/core';

const UnStyleMessage = ({ variant, text, severity = 'warning', full, className }) => {
	return (
		<Alert variant={variant} severity={severity} className={className}>
			<Span modifiers={['large', 'light']}>{text}</Span>
		</Alert>
	);
};

const Message = styled(UnStyleMessage)`
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

const UnStyleCoverMessage = ({ variant, text, severity = 'warning', className, fade }) => {
	return (
		<Fade in={fade}>
			<Alert variant={variant} severity={severity} className={className}>
				<Span modifiers={['large', 'light']}>{text}</Span>
			</Alert>
		</Fade>
	);
};

const CoverMessage = styled(UnStyleCoverMessage)`
	position: fixed;
	top: 0;
	left: 0;
	margin: 0 25%;
	border-radius: 0 0 2.5rem 2.5rem;
	width: 50%;
	${setFlex({ x: 'center', y: 'center' })}
`;

export { Message, CoverMessage };
