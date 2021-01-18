import React from 'react';
import { Link } from 'react-router-dom';
import { Col, FormContainer, Form } from '../../design/components';
import { useUserState } from '../../stores/user/userStateContext';
import { useUserActions } from '../../stores/user/userActionContext';
import { useForm } from 'react-hook-form';
import { Select } from '../../design/components';
import axios from 'axios';

const UserProductEdit = ({ location }) => {
   const { userProducts, statusUserProducts, errorUserProducts } = useUserState();
   const { createUserProduct } = useUserActions();
   const { register, handleSubmit, errors } = useForm();
   console.log(userProducts);
   return (
      <Col width='12'>
         <FormContainer>
            <Form.Title modifiers={['big', 'light']}>Edit Product</Form.Title>
            <Form onSubmit={handleSubmit(createUserProduct)}>
               <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Input
                     name='name'
                     type='text'
                     ref={register({
                        required: 'Please provide your product name'
                     })}
                  />
               </Form.Group>
               <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Input
                     name='price'
                     type='number'
                     ref={register({
                        required: 'Please product your product price'
                     })}
                  />
               </Form.Group>
               <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <Form.Input name='image' type='file' ref={register} />
               </Form.Group>
               <Form.Group>
                  <Form.Label>Brand</Form.Label>
                  <Form.Input
                     name='brand'
                     type='text'
                     ref={register({
                        required: 'Please product your product brand'
                     })}
                  />
               </Form.Group>
               <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Select ref={register} name='category'>
                     <option value='Electronics'>Electronics</option>
                  </Select>
               </Form.Group>
               <Form.Group>
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Input
                     name='countInStock'
                     type='number'
                     ref={register({
                        required: 'Please product your count'
                     })}
                  />
               </Form.Group>
               <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Input
                     name='description'
                     type='text'
                     ref={register({
                        required: 'Please product your product description'
                     })}
                  />
               </Form.Group>
               <Form.Button>Create</Form.Button>
            </Form>
         </FormContainer>
      </Col>
   );
};

export default UserProductEdit;

// {{pathname: '/signup', state: { prevPath: location.pathname }}}
