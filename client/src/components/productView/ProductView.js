import React from 'react';
import './productview.scss';
import StarIcon from '@material-ui/icons/Star';



const ProductView = () => {
	
	return (
      <div className = "product-view">
      	<h1 className = "product-view__title">Latest Products</h1>
        <div className = "product-view__productbox">
        	<div className = "product-view__product">
        		<a href="#" className = "product-view__linkimage">
        			<img src = "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MV7N2?wid=572&hei=572&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1551489688005"  alt="Image Test" className = "product-view__image" />
        		</a>
                <div className = "product-view__productdetails">
                	<a href="#" className = "product-view__linkname">
                		Airpods Wireless Bluetooth
                	</a>
                	<div className = "product-view__rating">
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<span className = "product-view__ratingcount">0 reviews</span>
                	</div>
                	<h3 className = "product-view__price">
                		$89.99
                	</h3>
                </div>
        	</div>

        	<div className = "product-view__product">
        		<a href="#" className = "product-view__linkimage">
        			<img src = "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MV7N2?wid=572&hei=572&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1551489688005"  alt="Image Test" className = "product-view__image" />
        		</a>
                <div className = "product-view__productdetails">
                	<a href="#" className = "product-view__linkname">
                		Airpods Wireless Bluetooth
                	</a>
                	<div className = "product-view__rating">
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<span className = "product-view__ratingcount">0 reviews</span>
                	</div>
                	<h3 className = "product-view__price">
                		$89.99
                	</h3>
                </div>
        	</div>

        	<div className = "product-view__product">
        		<a href="#" className = "product-view__linkimage">
        			<img src = "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MV7N2?wid=572&hei=572&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1551489688005"  alt="Image Test" className = "product-view__image" />
        		</a>
                <div className = "product-view__productdetails">
                	<a href="#" className = "product-view__linkname">
                		Airpods Wireless Bluetooth
                	</a>
                	<div className = "product-view__rating">
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<span className = "product-view__ratingcount">0 reviews</span>
                	</div>
                	<h3 className = "product-view__price">
                		$89.99
                	</h3>
                </div>
        	</div>

        	<div className = "product-view__product">
        		<a href="#" className = "product-view__linkimage">
        			<img src = "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MV7N2?wid=572&hei=572&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1551489688005"  alt="Image Test" className = "product-view__image" />
        		</a>
                <div className = "product-view__productdetails">
                	<a href="#" className = "product-view__linkname">
                		Airpods Wireless Bluetooth
                	</a>
                	<div className = "product-view__rating">
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<span className = "product-view__ratingcount">0 reviews</span>
                	</div>
                	<h3 className = "product-view__price">
                		$89.99
                	</h3>
                </div>
        	</div>

        	<div className = "product-view__product">
        		<a href="#" className = "product-view__linkimage">
        			<img src = "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MV7N2?wid=572&hei=572&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1551489688005"  alt="Image Test" className = "product-view__image" />
        		</a>
                <div className = "product-view__productdetails">
                	<a href="#" className = "product-view__linkname">
                		Airpods Wireless Bluetooth
                	</a>
                	<div className = "product-view__rating">
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<StarIcon className = "product-view__ratingstar" />
                		<span className = "product-view__ratingcount">0 reviews</span>
                	</div>
                	<h3 className = "product-view__price">
                		$89.99
                	</h3>
                </div>
        	</div>
        </div>
      </div>
		)
}

export default ProductView;