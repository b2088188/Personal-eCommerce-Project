import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useCart from 'context/cart/cartContext';
import styled from 'styled-components/macro';
import { CenterWrapper, Row, Col, Title, Span, Button } from 'design/components';
import { setBorder, setFlex, media } from 'design/utils';
import CartItem from './CartItem';

const CartView = () => {
   const [{ cartList, totalPrice, totalQuantity }] = useCart();
   const [toShipping, setToShipping] = useState(false);

   function renderCartList(list) {
      return list.map(function generateItem(item) {
         return <CartItem key={item.product} item={item} />;
      });
   }

   if (toShipping) return <Redirect to='/shipping' />;

   return (
      <Row>
         <Col width='12'>
            <CenterWrapper
               width={{ desktop: '70', tabport: '100' }}
               css={`
                  padding: 2rem;
               `}
            >
               <Row direction={{ tabport: 'column' }}>
                  <Col width='7' spacing='1'>
                     <Title modifiers='large'>Shopping Cart</Title>
                     {renderCartList(cartList)}
                  </Col>
                  <Col
                     width='4'
                     spacing='1'
                     css={`
                        ${setBorder()}
                        ${setFlex({ direction: 'column', y: 'flex-start' })}
                        align-self: flex-start;
                        border-collapse: collapse;
                        ${media.tabport(`
                           width: 100%;
                           margin-top: 2rem;
                           `)}
                     `}
                  >
                     <div
                        css={`
                           padding: 0.75rem;
                           width: 100%;
                           ${media.tabport(`
                              text-align: center;
                              `)}
                        `}
                     >
                        <Title as='h2' modifiers={['medium', 'light']}>
                           Subtotal ({totalQuantity}) Items
                        </Title>
                        <Span modifiers='medium'>${totalPrice}</Span>
                     </div>
                     <Button
                        css={`
                           width: 100%;
                           border: none;
                           ${setBorder({ position: 'border-top' })}
                        `}
                        modifiers='outline'
                        disabled={cartList.length < 1}
                        onClick={() => setToShipping(true)}
                     >
                        {cartList.length > 0
                           ? 'Proceed To Check Out'
                           : "You haven't choose any item yet, please get one."}
                     </Button>
                  </Col>
               </Row>
            </CenterWrapper>
         </Col>
      </Row>
   );
};

export default CartView;
