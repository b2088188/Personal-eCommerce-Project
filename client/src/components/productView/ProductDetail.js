import * as R from 'ramda';
import React, { useState, useEffect, useCallback } from 'react';
import { Link as ReactLink, Redirect, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
   Container,
   Button,
   Image,
   Span,
   Title,
   ListGroup,
   Row,
   Col,
   Form,
   Select
} from '../../design/components';
import { Message, Options } from '../../design/elements';
import { useProduct } from '../../stores/product/productContext';
import { useReviewState } from '../../stores/review/reviewStateContext';
import { useReviewActions } from '../../stores/review/reviewActionContext';
import { useAuthState } from '../../stores/auth/authStateContext';
import { useCartActions } from '../../stores/cart/cartActionContext';
import { addToCartList } from '../../stores/cart/CartStore';
import RatingStar from '../../utils/RatingStar';
import Spinner from '../../utils/Spinner';
import formatDate from '../../utils/formatDate';
import axios from 'axios';

const ProductDetail = ({ className }) => {
   const { user } = useAuthState();
   const { product, statusProduct, errorProduct, getProduct } = useProduct();
   const { dispatchCart } = useCartActions();
   const { reviewsHandle } = useReviewActions();
   const { reviews, statusReviews } = useReviewState();
   const { id } = useParams();
   const { register, handleSubmit, errors } = useForm();
   const [selectQty, setSelectQty] = useState(1);
   const [toCart, setToCart] = useState(false);
   useEffect(() => {
      if (!id) return;
      getProduct(id);
      reviewsHandle(axios.get(`/api/v1/products/${id}/reviews`));
   }, [id, getProduct, reviewsHandle]);

   function addCartClick(item, quantity) {
      return function () {
         addToCartList(dispatchCart, item, +quantity);
         setToCart(true);
      };
   }

   const onSubmit = R.curry(function (productId, { rating, review }) {
      reviewsHandle(
         axios.post(`/api/v1/products/${productId}/reviews`, { rating: +rating, review })
      );
   }, 2);

   function renderSelect(count) {
      return (
         <ListGroup bbottom flexy='center'>
            <ListGroup.Item width='50'>Quantity</ListGroup.Item>
            <ListGroup.Item width='50'>
               <Select onChange={(e) => setSelectQty(e.target.value)}>
                  <Options options={count} />
               </Select>
            </ListGroup.Item>
         </ListGroup>
      );
   }

   function renderReviewList(list) {
      return list?.map((review) => {
         return (
            <ListGroup bdbottom key={review._id}>
               <ListGroup.Item full>
                  <Span modifiers={['large', 'exlight']}>{review.user.name}</Span>
               </ListGroup.Item>
               <ListGroup.Item full>
                  <RatingStar average={review.rating} />
               </ListGroup.Item>
               <ListGroup.Item full>
                  <ListGroup.Span modifiers={['medium', 'exlight']}>
                     {formatDate(review.createdAt)}
                  </ListGroup.Span>
               </ListGroup.Item>
               <ListGroup.Item full>
                  <ListGroup.Paragraph modifiers={['small', 'exlight']}>
                     {review.review}
                  </ListGroup.Paragraph>
               </ListGroup.Item>
            </ListGroup>
         );
      });
   }

   if (toCart) return <Redirect to='/cart' />;

   if (statusProduct === 'idle' || statusProduct === 'pending') return <Spinner />;
   if (statusProduct === 'rejected') return <Message alert={errorProduct} severity='error' />;
   if (statusProduct === 'resolved')
      return (
         <div className={className}>
            <div className='container'>
               <Button as={ReactLink} to='/' className='home'>
                  Go Back
               </Button>
               <Row>
                  <Col width='4' spacing='2.5'>
                     <Image src={product.image} alt={product.name} />
                  </Col>
                  <Col width='3' spacing='2.5'>
                     <ListGroup bdbottom>
                        <Title as='h2' modifiers={['large', 'light']}>
                           {product.name}
                        </Title>
                     </ListGroup>
                     <ListGroup flexy='center' bdbottom>
                        <ListGroup.Item half>
                           <RatingStar average={product.ratingsAverage} />
                        </ListGroup.Item>
                        <ListGroup.Item half>
                           <Span className='rating'>{product.ratingsQuantity} reviews</Span>
                        </ListGroup.Item>
                     </ListGroup>
                     <ListGroup bdbottom>Price: ${product.price}</ListGroup>
                     <ListGroup bdbottom>{product.description}</ListGroup>
                  </Col>
                  <Col width='3' spacing='2.5'>
                     <ListGroup bdbottom flexy='center'>
                        <ListGroup.Item half>Price:</ListGroup.Item>
                        <ListGroup.Item half>
                           <span className='product-detail__col'>${product.price}</span>
                        </ListGroup.Item>
                     </ListGroup>
                     <ListGroup bdbottom flexy='center'>
                        <ListGroup.Item half>Status:</ListGroup.Item>
                        <ListGroup.Item half>
                           {product.countInStock > 1 ? 'In Stock' : 'Out of Stock'}
                        </ListGroup.Item>
                     </ListGroup>
                     {product.countInStock > 0 && renderSelect(product.countInStock)}
                     <ListGroup bdtop>
                        <ListGroup.Button
                           modifiers='full'
                           onClick={addCartClick(product, selectQty)}
                        >
                           Add To Cart
                        </ListGroup.Button>
                     </ListGroup>
                  </Col>
                  <Col width='6'>
                     <ListGroup>
                        <ListGroup.Title modifiers='large'>Reviews</ListGroup.Title>
                        {statusReviews === 'pending' ? <Spinner /> : null}
                        {statusReviews === 'resolved' && reviews.length > 0 ? (
                           renderReviewList(reviews)
                        ) : (
                           <Message alert='No Review yet' severity='info' />
                        )}
                        <ListGroup bdtop>
                           {user ? (
                              <Form onSubmit={handleSubmit(onSubmit(id))}>
                                 <Form.Group>
                                    <Form.Label>Rating</Form.Label>
                                    <Select name='rating' id='rating' ref={register}>
                                       <Options
                                          options={[
                                             { value: 1, text: '1 - Poor' },
                                             { value: 2, text: '2 - Fair' },
                                             { value: 3, text: '3 - OK' },
                                             { value: 4, text: '4 - Great' },
                                             { value: 5, text: '5 - Awesome' }
                                          ]}
                                       />
                                    </Select>
                                 </Form.Group>
                                 <Form.Group>
                                    <Form.Label>Review</Form.Label>
                                    <Form.Input
                                       name='review'
                                       as='textarea'
                                       ref={register({
                                          required: "Review can't not be empty",
                                          maxLength: 30
                                       })}
                                    />
                                 </Form.Group>
                                 <Form.Button>Submit</Form.Button>
                              </Form>
                           ) : (
                              <Message
                                 text='Please sign in to write down your review'
                                 severity='info'
                              />
                           )}
                        </ListGroup>
                     </ListGroup>
                  </Col>
               </Row>
            </div>
         </div>
      );
};

export default styled(ProductDetail)`
   .container {
      width: 70%;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
   }

   .row {
      width: 100%;
      display: flex;
   }

   .home {
      margin: 2rem 0;
   }

   .imagebox {
      box-shadow: var(--shadow-dark-shallow);
   }

   .rating {
      margin-left: 1rem;
   }
`;
