import React, { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { deleteFromCartList, changeQuantity } from 'context/cart/CartProvider';
import useCart from 'context/cart/cartContext';
import styled from 'styled-components/macro';
import { ListGroup, Button, ImageContainer, Image, Link, Select, Icon } from 'design/components';
import { colorGrey, setBorder } from 'design/utils';
import { Delete } from '@material-ui/icons';
import Options from 'components/Options';

const CartItem = ({ item }) => {
   const [, { dispatchCart }] = useCart();
   const [selectQty, setSelectQty] = useState(item.quantity);

   function onSelectChange(e) {
      changeQuantity(dispatchCart, item.product, +e.target.value);
      setSelectQty(e.target.value);
   }

   function deleteFromCart(id) {
      return function () {
         deleteFromCartList(dispatchCart, id);
      };
   }

   return (
      <ListGroup flexy='center'>
         <ListGroup.Item width='15' spacing='3'>
            <ImageContainer>
               <Image src={`${process.env.REACT_APP_BACKEND_URL}/${item.image}`} alt={item.name} />
            </ImageContainer>
         </ListGroup.Item>
         <ListGroup.Item width='30' spacing='3'>
            <Link
               as={ReactLink}
               to={`/products/${item.product}`}
               css={`
                  transition: border-bottom 0.25s;
                  ${setBorder({ position: 'border-bottom' })}
                  &:hover {
                     ${setBorder({ position: 'border-bottom', color: colorGrey.dark2 })}
                  }
               `}
            >
               {item.name}
            </Link>
         </ListGroup.Item>
         <ListGroup.Item width='15' spacing='3'>
            ${item.price}
         </ListGroup.Item>
         <ListGroup.Item width='15' spacing='3'>
            <Select onChange={onSelectChange} value={selectQty}>
               <Options options={item.countInStock} />
            </Select>
         </ListGroup.Item>
         <ListGroup.Item>
            <Button
               css={`
                  color: ${colorGrey.light4};
                  transition: color 0.25s;
                  &:hover {
                     color: ${colorGrey.dark2};
                  }
               `}
               modifiers={['transparent', 'dark']}
               onClick={deleteFromCart(item.product)}
            >
               <Icon as={Delete} />
            </Button>
         </ListGroup.Item>
      </ListGroup>
   );
};

export default CartItem;
