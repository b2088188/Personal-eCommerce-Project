import React, { useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Col, FormContainer, Form } from '../../../design/components';
import { useProducts } from '../../../stores/product/productsContext';
import { useForm } from 'react-hook-form';
import { Select } from '../../../design/components';
import { Spinner, Message } from '../../../design/elements';
import axios from 'axios';

const ProductEdit = ({ location }) => {
   const { products, statusProducts, errorProducts, createProduct, updateProduct } = useProducts();
   const { register, handleSubmit, setValue, errors } = useForm();
   const { productId } = useParams();
   const history = useHistory();
   const product = products.find((el) => el._id === productId);

   useEffect(() => {
      if (product) {
         setValue('name', product.name);
         setValue('price', product.price);
         setValue('brand', product.brand);
         setValue('category', product.category);
         setValue('countInStock', product.countInStock);
         setValue('description', product.description);
      }
   }, [product]);

   async function onEditHandle(values) {
      if (!product) {
         await createProduct(values);
      } else {
         await updateProduct(productId, values);
      }
      history.push('/products');
   }

   if (statusProducts === 'pending') return <Spinner modifiers='dark' />;

   return (
      <Col width='12'>
         <FormContainer>
            <Form.Title modifiers={['big', 'light']}>Edit Product</Form.Title>
            <Form onSubmit={handleSubmit(onEditHandle)}>
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
               <Form.Button>{!productId ? 'Create' : 'Update'}</Form.Button>
            </Form>
         </FormContainer>
      </Col>
   );
};

export default ProductEdit;

// {{pathname: '/signup', state: { prevPath: location.pathname }}}
