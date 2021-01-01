import * as R from 'ramda';
import React, { useState, useEffect, useCallback } from 'react';
import { Link as ReactLink, Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Button, Image, Span, Title, ListGroup } from '../../design/components';
import {useProduct} from '../../stores/product/productContext';
import {useCartActions} from '../../stores/cart/cartActionContext';
import RatingStar from '../../utils/RatingStar';
import Select from '../../utils/Select';
import Spinner from '../../utils/Spinner';
import Message from '../../utils/Message';

const ProductDetail = ({
    history,
    match,
    className
}) => {
    const {product, loadingProduct, errorProduct, getProduct} = useProduct();
    const  {dispatchCart} = useCartActions();
    const {id} = useParams();



    const [selectQty, setSelectQty] = useState(1);
    const [toCart, setToCart] = useState(false);
    useEffect(() => {
        getProduct({Url: `/api/v1/products/${id}`})
    }, [id, getProduct])



    function renderSelect(count) {
        return (
            <ListGroup bbottom ycenter>
                    <ListGroup.Item half>Quantity</ListGroup.Item>
                    <ListGroup.Item half>
                        <Select count = {count} value = {selectQty} onChange = {(e) => setSelectQty(e.target.value)} />
                    </ListGroup.Item>
            </ListGroup>
        )
    }

    function addCartClick(item, quantity) {
        return function() {
            dispatchCart({
            type: 'ADD_CARTITEM',
            payload: {
                item: {
                    ['product']: R.prop('_id', item),
                    ...R.pick(['name', 'image', 'price', 'countInStock'], item),
                    ...{quantity: +quantity}
                }
            }
        })
            dispatchCart({type: 'CALCULATE_QTYANDPRICE'});
            setToCart(true);
        }
    }


    if(toCart)
        return <Redirect to = '/cart' />

    if (loadingProduct)
        return <Spinner />
    if (errorProduct)
        return <Message alert = {errorProduct} severity = 'error' />
    if (!product)
        return null;

    return (
        <Container>            
        <div className = {className}>            
        <div className = "container">
        <Button as = {ReactLink} to = '/' className = 'home'>Go Back</Button>
        <ListGroup ystart>
            <ListGroup.Item p35>                
            <Image src = {product.image} alt = {product.name} />
            </ListGroup.Item>
            <ListGroup.Item p25>
                <ListGroup bdbottom>
                    <Title as = 'h2' modifiers = {['large', 'light']}>{product.name}</Title>
                </ListGroup>
                <ListGroup ycenter bdbottom>
                    <ListGroup.Item half>                        
                    <RatingStar average = {product.ratingsAverage} />
                    </ListGroup.Item>
                    <ListGroup.Item half>                        
                    <Span className = 'rating'>{product.ratingsQuantity} reviews</Span>
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup bdbottom>
                    Price: ${product.price}
                </ListGroup>
                <ListGroup bdbottom>
                    {product.description}
                </ListGroup>
            </ListGroup.Item>
            <ListGroup.Item p25>
                <ListGroup bdbottom ycenter>
                    <ListGroup.Item half>
                        Price: 
                    </ListGroup.Item>
                    <ListGroup.Item half>                        
                    <span className = "product-detail__col">${product.price}</span>
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup bdbottom ycenter>
                    <ListGroup.Item half >
                        Status: 
                    </ListGroup.Item>
                    <ListGroup.Item half>                        
                    {product.countInStock>1 ? 'In Stock' : 'Out of Stock'}
                    </ListGroup.Item>
                </ListGroup>
                {product.countInStock>0 && renderSelect(product.countInStock)}
                <ListGroup bdtop>
                    <ListGroup.Button modifiers = 'full' onClick = {addCartClick(product, selectQty)}>
                        Add To Cart 
                    </ListGroup.Button>
                </ListGroup>
            </ListGroup.Item>
        </ListGroup>
      </div>
        </div>
        </Container>
    )
}

export default styled(ProductDetail)
`
   .container{
    width: 70%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items:flex-start;
   }

    .home{
        margin: 2rem 0;
    }

    .imagebox{
        box-shadow: var(--shadow-dark-shallow);
    }


   .rating{
    margin-left: 1rem;
   }

`;