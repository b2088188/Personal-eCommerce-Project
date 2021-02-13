import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Span, Title, ListGroup, Col, Form, Select } from 'design/components';
import Options from 'components/Options';
import { Message } from 'components/Message';
import Spinner from 'components/Spinner';
import RatingStar from 'components/RatingStar';
import { useReviewItems, useCreateReview, useReviewItem } from 'utils/review';
import useAuth from 'context/auth/authContext';
import formatDate from 'utils/formatDate';
import { useForm } from 'react-hook-form';

const ReviewView = () => {
   const { productId } = useParams();
   const [{ user }] = useAuth();
   const {
      reviews,
      isIdle: isReviewIdle,
      isLoading: isReviewLoading,
      isSuccess: isReviewSuccess
   } = useReviewItems(productId);
   const reviewItem = useReviewItem(productId);
   const { createReview, isSuccess: isCreateSuccess } = useCreateReview(productId);
   const { register, handleSubmit } = useForm();

   function onReviewCreate({ rating, review }) {
      createReview({ rating: +rating, review });
   }

   function renderReviewList(list) {
      return list?.map((review) => {
         return (
            <ListGroup bdbottom key={review._id}>
               <ListGroup.Item full>
                  <Span modifiers={['large', 'exlight']}>{review.user?.name || ''}</Span>
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

   if (isReviewIdle || isReviewLoading)
      return (
         <Col width='6'>
            <Spinner modifiers='dark' />
         </Col>
      );

   return (
      <Col width='6'>
         <ListGroup>
            <Title modifiers='large'>Reviews</Title>
            {isReviewSuccess ? (
               reviews.length > 0 ? (
                  renderReviewList(reviews)
               ) : (
                  <Message text='No Review yet' severity='info' />
               )
            ) : null}
            <ListGroup.Item>
               {isReviewSuccess ? (
                  user && !reviewItem ? (
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
                     <Message text='Please sign in to write down your review' severity='info' />
                  ) : null
               ) : null}
            </ListGroup.Item>
         </ListGroup>
      </Col>
   );
};

export default ReviewView;
