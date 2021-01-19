import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useCartState } from '../../../stores/cart/cartStateContext';
import styled from 'styled-components';
import { CenterWrapper, Row, Col, Title, Span, Button } from '../../../design/components';
import { setBorder, setFlex, setFlexWidth, colorGrey, media } from '../../../design/utils';
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
      <Row className={className}>
         <Col width='12'>
            <CenterWrapper width={{ desktop: '70', tabport: '100' }} className='cart'>
               <Row direction={{ tabport: 'column' }}>
                  <Col width='7' spacing='1'>
                     <Title className='cart__title' modifiers='large'>
                        Shopping Cart
                     </Title>
                     {renderCartList(cartList)}
                  </Col>
                  <Col width='4' spacing='1' className='cart__info'>
                     <div className='cart__totalbox'>
                        <Title as='h2' className='cart__title' modifiers={['medium', 'light']}>
                           Subtotal ({totalQuantity}) Items
                        </Title>
                        <Span modifiers='medium'>${totalPrice}</Span>
                     </div>
                     <Button
                        className='cart__button'
                        modifiers='outline'
                        disabled={cartList.length < 1}
                        onClick={() => setToShipping(true)}
                     >
                        {cartList.length > 0
                           ? 'Proceed To Check Out'
                           : "You haven't any item yet, please get one."}
                     </Button>
                  </Col>
               </Row>
            </CenterWrapper>
         </Col>
      </Row>
   );
};

export default styled(CartView)`
   .cart {
      padding: 2rem;
      &__info {
         ${setBorder()}
         ${setFlex({ direction: 'column', y: 'flex-start' })}
         align-self: flex-start;
         border-collapse: collapse;
         ${media.tabport(`
            width: 100%;
            margin-top: 2rem;
            `)}
      }
      &__totalbox {
         padding: 0.75rem;
         width: 100%;
         ${media.tabport(`
            text-align: center;
            `)}
      }
      &__button {
         width: 100%;
         border: none;
         ${setBorder({ position: 'border-top' })}
      }
   }
`;
