import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from '../../stores/product/productContext';
import CartContext from '../../stores/cart/cartContext';
import RatingStar from '../../utils/RatingStar';
import Select from '../../utils/Select';

const ProductDetail = ({
    history,
    match
}) => {
    const { product, getProduct } = useContext(ProductContext);
    const {addCartList} = useContext(CartContext);
    const [selectQty, setSelectQty] = useState(1);
    useEffect(() => {
        getProduct(match.params.id)
    }, [match.params.id])


        function renderSelect(count) {
        return (
            <div className = "product-detail__group product-detail__group--flex-row">
                    <div className = "product-detail__col">Quantity</div>
                    <div className = "product-detail__col">
                        <Select count = {count} selectQty = {selectQty} setSelectQty = {setSelectQty} />
                    </div>
                </div>
        )
    }

  function addCartClick(product, quantity) {
    return function () {        
      addCartList(product, quantity);
      history.push(`/cart`)
    }
  }


    if (!product)
        return null;
    return (
        <div className = "product-detail">
      	<Link to = "/" className = "btn--default product-detail__linkhome">Go Back</Link>
      	<div className = "product-detail__box">
      	    <div className = "product-detail__imagebox">      	    	
      		<img src = {product.image} alt = {product.name}  className = "product-detail__image" />
      	    </div>
      		<div className = "product-detail__productbox">
      			<div className = "product-detail__group">
      				<h2 className = "product-detail__name">{product.name}</h2>
      			</div>
      			<div className = "product-detail__group u-vertical-center">
      				<RatingStar average = {product.ratingsAverage} />
      				<span className = "product-detail__rating">{product.ratingsQuantity} reviews</span>
      			</div>
      			<div className = "product-detail__group">
      				Price: ${product.price}
      			</div>
      			<div className = "product-detail__group">
      				{product.description}
      			</div>
      		</div>
      		<div className = "product-detail__checkoutbox">
      			<div className = "product-detail__group product-detail__group--flex-row">
      				<div className = "product-detail__col">Price: </div>
      				<span className = "product-detail__col">${product.price}</span>
      			</div>
      			<div className = "product-detail__group u-flex-row product-detail__group--flex-row">
      				<div className = "product-detail__col">Status: </div>
      				<div className = "product-detail__col">{product.countInStock>1 ? 'In Stock' : 'Out of Stock'}</div>
      			</div>
      			{product.countInStock>0 && renderSelect(product.countInStock)}
      			<div className="product-detail__group">
      				<button className = "btn--default product-detail__btnaddcart" onClick = {addCartClick(product, selectQty)}>
                        Add To Cart 
                    </button>
      			</div>
      		</div>
      	</div>
      </div>
    )
}

export default ProductDetail;