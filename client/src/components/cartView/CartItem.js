import React, { useState, useContext } from 'react';
import { Link as ReactLink, useRouteMatch } from 'react-router-dom';
import {addToCartList, deleteFromCartList, changeQuantity} from '../../stores/cart/CartStore';
import {useCartActions} from '../../stores/cart/cartActionContext';
import styled from 'styled-components';
import { ListGroup, Button, Image, Link, Select } from '../../design/components';
import DeleteIcon from '@material-ui/icons/Delete';
import {Options} from '../../design/elements';

const CartItem = ({
    item
}) => {
    const {dispatchCart} = useCartActions();
    const [selectQty, setSelectQty] = useState(item.quantity);
    const {url} = useRouteMatch();

    function onSelectChange(e) {
        changeQuantity(dispatchCart, item.product, +e.target.value);
        setSelectQty(e.target.value);
    }

  function deleteFromCart(id) {
    return function () {        
    deleteFromCartList(dispatchCart, id);
    }
  }

    return (
        <ListGroup ycenter>
     			<ListGroup.Item p15>
     				<Image src = {item.image} alt = {item.name} className = 'image' />
     			</ListGroup.Item>
     			<ListGroup.Item p15>
     				<Link as = {ReactLink} to = {`/products/${item.product}`} className = 'link'>
     					{item.name}
     				</Link>
     			</ListGroup.Item>
     			<ListGroup.Item p15>
     				${item.price}
     			</ListGroup.Item>
     			<ListGroup.Item p15>
                            <Select onChange = {onSelectChange}>
                               <Options options = {item.countInStock} />
                            </Select>
     			</ListGroup.Item>
     			<ListGroup.Item p15>
     				<Button className = 'delete' modifiers = 'transparent' onClick = {deleteFromCart(item.product)}>
     					<DeleteIcon fontSize = 'large' />
     				</Button>
     			</ListGroup.Item>
     		</ListGroup>
    )
}

export default styled(CartItem)
`
	.link{
       transition: border-bottom .25s;
       border-bottom: solid .1rem currentColor;
	&:hover{
		border-bottom: solid .1rem currentColor;
	}
	}

   .delete{
   	transition: background .25s;
   	 &:hover{
   	 	background: var(--color-grey-light-4);
   	 }
   }
`;