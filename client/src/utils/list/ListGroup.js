import React from 'react';

const ListGroup = ({
	title,
	info
}) => {
	

	return (
     <div className = 'list-group'>
		<h2 className = 'list-group__title'>{title}</h2>
		<p className = 'list-group__info'>{info}</p>
	</div>
		)
}

export default ListGroup;