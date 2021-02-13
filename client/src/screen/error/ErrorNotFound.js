import React from 'react';
import { Row, Col } from 'design/components';
import { Message } from 'components/Message';

const ErrorNotFound = () => {
	return (
		<Row>
			<Col width='12'>
				<Message severity='error' text='404 Not Found' />
			</Col>
		</Row>
	);
};

export default ErrorNotFound;
