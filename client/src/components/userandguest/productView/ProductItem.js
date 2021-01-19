import React from 'react';
import { Card, Image, ListGroup } from '../../../design/components';
import { Link } from 'react-router-dom';
import RatingStar from '../../../utils/RatingStar';

const ProductItem = ({ product }) => {
	return (
		<ListGroup.Item
			width={{ desktop: '20', tabland: '30', tabport: '45', phone: '90' }}
			spacing={{ desktop: '2', tabland: '1.5', tabport: '2.5', phone: '5' }}
		>
			<Card>
				<Card.Link as={Link} to={`/products/${product._id}`} modifiers='image'>
					<Image src={`http://127.0.0.1:8000/${product.image}`} alt={product.name} />
				</Card.Link>
				<div className='details'>
					<Card.Link as={Link} to={`/products/${product._id}`} modifiers='name'>
						{product.name}
					</Card.Link>
					<div className='rating'>
						<RatingStar average={product.ratingsAverage} />
						<Card.Span>{product.ratingsQuantity} reviews</Card.Span>
					</div>
					<Card.Title modifiers='medium'>${product.price}</Card.Title>
				</div>
			</Card>
		</ListGroup.Item>
	);
};

export default ProductItem;
