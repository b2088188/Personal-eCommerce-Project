import React, { useState, useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import {
   CenterWrapper,
   Button,
   ImageContainer,
   Image,
   Span,
   Title,
   ListGroup,
   Row,
   Col,
   Form,
   Select
} from '../../../design/components';
import { Message, Options, Spinner, RatingStar } from '../../../design/elements';
import { media } from '../../../design/utils';
import { useProduct } from '../../../stores/product/productContext';
import useReview from '../../../stores/review/reviewContext';
import useAuth from '../../../stores/auth/authContext';
import useCart from '../../../stores/cart/cartContext';
import { addToCartList, updateCartItem } from '../../../stores/cart/CartStore';
import formatDate from '../../../utils/formatDate';

const ProductDetail = ({ className }) => {
   const [{ user }] = useAuth();
   const { product, statusProduct, errorProduct, getProduct } = useProduct();
   const [{ cartList }, { dispatchCart }] = useCart();
   const [{ reviews, statusReviews }, { getReviews, createReview }] = useReview();
   const { productId } = useParams();
   const { register, handleSubmit } = useForm();
   const [selectQty, setSelectQty] = useState(1);
   const [toCart, setToCart] = useState(false);
   const isReviewed = user ? reviews.find((el) => el.user._id === user._id) : false;
   const isInCart = cartList.find((el) => el.product === productId);
   useEffect(() => {
      if (!productId) return;
      getProduct(productId);
      getReviews(productId);
   }, [productId, getProduct, getReviews]);

   function addCartClick(item, quantity) {
      return function () {
         if (!isInCart) {
            addToCartList(dispatchCart, item, +quantity);
         } else {
            updateCartItem(dispatchCart, item, +quantity);
         }
         setToCart(true);
      };
   }

   function onReviewCreate({ rating, review }) {
      createReview(productId, +rating, review);
   }

   function renderSelect(count) {
      return (
         <ListGroup bbottom flexy='center'>
            <ListGroup.Item width='50'>Quantity</ListGroup.Item>
            <ListGroup.Item>
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

   if (statusProduct === 'idle' || statusProduct === 'pending')
      return (
         <Row>
            <Spinner />
         </Row>
      );
   if (statusProduct === 'rejected')
      return (
         <Row>
            <Message text={errorProduct} severity='error' />
         </Row>
      );
   if (statusProduct === 'resolved')
      return (
         <Row className={className}>
            <CenterWrapper width='70' className='product'>
               <Button as={Link} to='/' className='product__link'>
                  Go Back
               </Button>
               <Row direction={{ tabport: 'column' }}>
                  <Col width='4' spacing='2.5' className='product__group'>
                     <ImageContainer>
                        <Image
                           src={`${process.env.REACT_APP_BACKEND_URL}/${product.image}`}
                           alt={product.name}
                        />
                     </ImageContainer>
                  </Col>
                  <Col width='3' spacing='2.5' className='product__group'>
                     <ListGroup bdbottom>
                        <Title as='h2' modifiers={['large', 'light']}>
                           {product.name}
                        </Title>
                     </ListGroup>
                     <ListGroup flexy='center' bdbottom>
                        <ListGroup.Item width='50'>
                           <RatingStar
                              average={product.ratingsQuantity < 1 ? 0 : product.ratingsAverage}
                           />
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Span>{product.ratingsQuantity} reviews</Span>
                        </ListGroup.Item>
                     </ListGroup>
                     <ListGroup bdbottom>
                        <ListGroup.Item width='50'>Price:</ListGroup.Item>
                        <ListGroup.Item>
                           <Span>${product.price}</Span>
                        </ListGroup.Item>
                     </ListGroup>
                     <ListGroup bdbottom>{product.description}</ListGroup>
                  </Col>
                  <Col width='3' spacing='2.5' className='product__group'>
                     <ListGroup bdbottom flexy='center'>
                        <ListGroup.Item width='50'>Price:</ListGroup.Item>
                        <ListGroup.Item>
                           <Span className='product__span'>${product.price}</Span>
                        </ListGroup.Item>
                     </ListGroup>
                     <ListGroup bdbottom flexy='center'>
                        <ListGroup.Item width='50'>Status:</ListGroup.Item>
                        <ListGroup.Item>
                           {product.countInStock > 1 ? 'In Stock' : 'Out of Stock'}
                        </ListGroup.Item>
                     </ListGroup>
                     {product.countInStock > 0 ? renderSelect(product.countInStock) : null}
                     <ListGroup bdtop>
                        <Button
                           onClick={addCartClick(product, selectQty)}
                           className='product__button'
                        >
                           Add To Cart
                        </Button>
                     </ListGroup>
                  </Col>
                  <Col width='6'>
                     <ListGroup>
                        <Title modifiers='large'>Reviews</Title>
                        {statusReviews === 'pending' ? (
                           <Spinner modifiers='dark' />
                        ) : statusReviews === 'resolved' && reviews.length > 0 ? (
                           renderReviewList(reviews)
                        ) : (
                           <Message text='No Review yet' severity='info' />
                        )}
                        <ListGroup.Item>
                           {statusReviews === 'resolved' ? (
                              user && !isReviewed ? (
                                 <Form onSubmit={handleSubmit(onReviewCreate)}>
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
                                             required: "Review can't not be empty"
                                          })}
                                       />
                                    </Form.Group>
                                    <Button>Submit</Button>
                                 </Form>
                              ) : !user ? (
                                 <Message
                                    text='Please sign in to write down your review'
                                    severity='info'
                                 />
                              ) : null
                           ) : null}
                        </ListGroup.Item>
                     </ListGroup>
                  </Col>
               </Row>
            </CenterWrapper>
         </Row>
      );
};

export default styled(ProductDetail)`
   .product {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      &__group {
         ${media.tabport(`
            margin-bottom: 5rem;
            `)}
      }
      &__link {
         margin: 2rem 0;
      }
      &__span {
         margin-left: 1rem;
      }
      &__button {
         width: 100%;
      }
   }
`;
