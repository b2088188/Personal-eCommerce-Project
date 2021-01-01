import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useCartState} from '../../stores/cart/cartStateContext';
import styled from 'styled-components';
import {Container, Title, Span, Button} from '../../design/components';
import {colorGrey, setBorder, setFlex, setFlexWidth} from '../../design/utils';
import CartItem from './CartItem';
import Spinner from '../../utils/Spinner';


const CartView = ({
    history,
    className
}) => {   
	const {cartList, totalPrice, totalQuantity} = useCartState();
   const [toShipping, setToShipping] = useState(false);

    // useEffect(() => {
    //   getCartList();
    // }, [getCartList])

    function renderCartList(list) {
    	return list.map(function generateItem(item) {
    		return <CartItem key = {item.product} item = {item} />
    	})
    }

    // if(loading)
    // 	return <Spinner />
    if(toShipping)
      return <Redirect to = '/shipping' />

	return (
      <Container>        
     <div className = {className}>
     <div className = 'container'>         
     	<div className = "cartlist">
     		<Title modifiers = 'large' className = 'title'>Shopping Cart</Title>
     		{renderCartList(cartList)}
     	</div>
     	<div className = "info">
     		<div className = "totalbox">
     			<Title as = 'h2' modifiers = {['medium', 'light']} className = 'subtitle'>Subtotal ({totalQuantity}) Items</Title>
     			<Span modifiers = 'medium'>${totalPrice}</Span>
     		</div>
     		<Button btop modifiers = {['transparent', 'full']} onClick = {() => setToShipping(true)}>
     			Proceed To Check Out
     		</Button>
     	</div>
     </div>
     </div>
     </Container>
		)
}

export default styled(CartView)`
   .container{
      width: 70%;
      margin: auto;
    display: flex;
    padding: 2rem;
   }
   .cartlist{
     ${setFlexWidth({width: '60'})}  
   }
   .info{
      ${setFlexWidth({width: '30'})}      
      ${setBorder()}
      ${setFlex({direction: 'column', y: 'flex-start'})}
   }
   .title{
      padding: 1rem;
   }
   .subtitle{
      padding: 1rem 0;
   }

   .totalbox{
      padding: .75rem;     
   }

`;