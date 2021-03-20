import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'design/components';
import { Message } from 'components/Message';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
	const { listen } = useHistory();

	useEffect(() => {
		const unlisten = listen(() => {
			if (error) resetErrorBoundary();
		});
		return () => unlisten();
	}, [listen]);
	return (
		<Row>
			<Message text={error.message} severity='error' />;
		</Row>
	);
};

const ErrorNotFound = () => {
	return (
		<Row>
			<Col width='12'>
				<Message severity='error' text='404 Not Found' />
			</Col>
		</Row>
	);
};

export { ErrorNotFound, ErrorFallback };
