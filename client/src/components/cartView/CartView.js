import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useCartState } from '../../stores/cart/cartStateContext';
import styled from 'styled-components';
import { Col, Title, Span, Button } from '../../design/components';
import { setBorder, setFlex, setFlexWidth } from '../../design/utils';
import CartItem from './CartItem';

const CartView = ({ className }) => {
   const { cartList, totalPrice, totalQuantity } = useCartState();
   const [toShipping, setToShipping] = useState(false);

   function renderCartList(list) {
      return list.map(function generateItem(item) {
         return <CartItem key={item.product} item={item} />;
      });
   }

   if (toShipping) return <Redirect to='/shipping' />;

   return (
      <Col width='12' className={className}>
         <div className='container'>
            <Col width='7'>
               <Title modifiers='large' className='title'>
                  Shopping Cart
               </Title>
               {renderCartList(cartList)}
            </Col>
            <Col width='4' className='info'>
               <div className='totalbox'>
                  <Title as='h2' modifiers={['medium', 'light']} className='subtitle'>
                     Subtotal ({totalQuantity}) Items
                  </Title>
                  <Span modifiers='medium'>${totalPrice}</Span>
               </div>
               <Button
                  btop
                  modifiers={['transparent', 'full']}
                  disabled={cartList.length < 1}
                  onClick={() => setToShipping(true)}
               >
                  {cartList.length > 0
                     ? 'Proceed To Check Out'
                     : "You haven't any item yet, please get one."}
               </Button>
            </Col>
         </div>
      </Col>
   );
};

export default styled(CartView)`
   .container {
      width: 70%;
      margin: auto;
      display: flex;
      padding: 2rem;
   }
   .info {
      ${setBorder()}
      ${setFlex({ direction: 'column', y: 'flex-start' })}
   }
   .title {
      padding: 1rem;
   }
   .subtitle {
      padding: 1rem 0;
   }

   .totalbox {
      padding: 0.75rem;
   }
`;
