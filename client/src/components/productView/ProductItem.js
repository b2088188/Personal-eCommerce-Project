import React from 'react';
import {Card, Image} from '../../design/components';
import {Link as ReactLink} from 'react-router-dom';
import RatingStar from '../../utils/RatingStar';

const ProductItem = ({
	product
}) => {


	return (
      <Card>
        		<Card.Link as = {ReactLink} to = {`/products/${product._id}`} modifiers = 'image'>
        			<Image src = {product.image} alt = {product.name}  />
        		</Card.Link>
                <div className = "details">
                	<Card.Link as = {ReactLink}  to = {`/products/${product._id}`} modifiers = 'name'>
                		{product.name}
                	</Card.Link>
                	<div className = "rating">
                		<RatingStar average = {product.ratingsAverage} />
                		<Card.Span>{product.ratingsQuantity} reviews</Card.Span>
                	</div>
                	<Card.Title  modifiers = 'medium'>
                		${product.price}
                	</Card.Title>
                </div>
        	</Card>    
		)
}

export default ProductItem;