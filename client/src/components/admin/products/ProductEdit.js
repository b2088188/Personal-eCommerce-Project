import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col, FormContainer, Form, Span, Button } from '../../../design/components';
import { useProducts } from '../../../stores/product/productsContext';
import { useForm } from 'react-hook-form';
import { Select } from '../../../design/components';
import { Spinner } from '../../../design/elements';

const ProductEdit = ({ location }) => {
   const { products, statusProducts, createProduct, updateProduct } = useProducts();
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
   }, [product, setValue]);

   async function onEditHandle(values) {
      if (!product) {
         await createProduct(values);
      } else {
         await updateProduct(productId, values);
      }
      history.push('/products');
   }

   if (statusProducts === 'pending')
      return (
         <Row>
            <Spinner modifiers='dark' />
         </Row>
      );

   return (
      <Row>
         <Col width='12'>
            <FormContainer width={{ desktop: '50', tabport: '90' }} my='2'>
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
                     {errors.name ? <Span modifiers='danger'>{errors.name.message}</Span> : null}
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>Price</Form.Label>
                     <Form.Input
                        name='price'
                        type='number'
                        min='1.00'
                        max='500.00'
                        step='0.01'
                        ref={register({
                           required: 'Please provide your product price'
                        })}
                     />
                     {errors.price ? <Span modifiers='danger'>{errors.price.message}</Span> : null}
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
                           required: 'Please provide your product brand'
                        })}
                     />
                     {errors.brand ? <Span modifiers='danger'>{errors.brand.message}</Span> : null}
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
                           required: 'Please provide your product count'
                        })}
                     />
                     {errors.countInStock ? (
                        <Span modifiers='danger'>{errors.countInStock.message}</Span>
                     ) : null}
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>Description</Form.Label>
                     <Form.Input
                        name='description'
                        type='text'
                        ref={register({
                           required: 'Please provide your product description'
                        })}
                     />
                     {errors.description ? (
                        <Span modifiers='danger'>{errors.description.message}</Span>
                     ) : null}
                  </Form.Group>
                  <Button>{!productId ? 'Create' : 'Update'}</Button>
               </Form>
            </FormContainer>
         </Col>
      </Row>
   );
};

export default ProductEdit;

// {{pathname: '/signup', state: { prevPath: location.pathname }}}
