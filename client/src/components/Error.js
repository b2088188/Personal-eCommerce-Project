import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'design/components';
import { Message } from 'components/Message';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
	const history = useHistory();

	history.listen((location, action) => {
		if (error) resetErrorBoundary();
	});
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
