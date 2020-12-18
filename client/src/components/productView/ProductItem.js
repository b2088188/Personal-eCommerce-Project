import React from 'react';
import {Link} from 'react-router-dom';
import RatingStar from '../../utils/RatingStar';

const ProductItem = ({
	product
}) => {


	return (
      <div className = "product-view__product">
        		<Link to = {`/products/${product._id}`} className = "product-view__linkimage">
        			<img src = {product.image} alt = {product.name} className = "product-view__image" />
        		</Link>
                <div className = "product-view__productdetails">
                	<Link to = {`/products/${product._id}`} className = "product-view__linkname">
                		{product.name}
                	</Link>
                	<div className = "product-view__rating">
                		<RatingStar average = {product.ratingsAverage} />
                		<span className = "product-view__ratingcount">{product.ratingsQuantity} reviews</span>
                	</div>
                	<h3 className = "product-view__price">
                		${product.price}
                	</h3>
                </div>
        	</div>    
		)
}

export default ProductItem;