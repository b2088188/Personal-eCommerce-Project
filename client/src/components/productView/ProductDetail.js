import React from 'react';
import {Link} from 'react-router-dom';
import RatingStar from '../../utils/RatingStar';

const ProductDetail = () => {
	
	return (
      <div className = "product-detail">
      	<Link className = "btn--default product-detail__linkhome">Go Back</Link>
      	<div className = "product-detail__box">
      	    <div className = "product-detail__imagebox">      	    	
      		<img src="https://cf.shopee.tw/file/ed8bf175bdec2cc967132a9f581b0811" alt="Image Test"  className = "product-detail__image" />
      	    </div>
      		<div className = "product-detail__productbox">
      			<div className = "product-detail__group">
      				<h2 className = "product-detail__name">AIRPODS WIRELESS BLUETOOTH HEADPHONES</h2>
      			</div>
      			<div className = "product-detail__group u-vertical-center">
      				<RatingStar size = 'medium' />
      				<span className = "product-detail__rating">0 reviews</span>
      			</div>
      			<div className = "product-detail__group">
      				Price: $89.99
      			</div>
      			<div className = "product-detail__group">
      				Description: $Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working
      			</div>
      		</div>
      		<div className = "product-detail__checkoutbox">
      			<div className = "product-detail__group product-detail__group--flex-row">
      				<div className = "product-detail__col">Price: </div>
      				<span className = "product-detail__col">$89.99</span>
      			</div>
      			<div className = "product-detail__group u-flex-row product-detail__group--flex-row">
      				<div className = "product-detail__col">Status: </div>
      				<div className = "product-detail__col">In Stock</div>
      			</div>
      			<div className = "product-detail__group u-flex-row product-detail__group--flex-row">
      				<div className = "product-detail__col">Quantity</div>
      				<div className = "product-detail__col">
      					<select name="" id=""></select>
      				</div>
      			</div>
      			<div className="product-detail__group">
      				<button className = "btn--default product-detail__btnaddcart">Add To Cart</button>
      			</div>
      		</div>
      	</div>
      </div>
		)
}

export default ProductDetail;