import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Row, Col, FormContainer, Form, Span, Button, Select } from 'design/components';
import { useCreateProduct, useProductItem, useUpdateProduct } from 'utils/product';
import { useAsync } from 'utils/hooks';
import { useForm } from 'react-hook-form';
import Spinner from 'components/Spinner';

const ProductEdit = ({ location }) => {
   const { productId } = useParams();
   const { create } = useCreateProduct();
   const { update } = useUpdateProduct(productId);
   const { isLoading, isSuccess, run } = useAsync();
   const { register, handleSubmit, setValue, errors } = useForm();
   const productItem = useProductItem(productId);

   useEffect(() => {
      if (productItem) {
         setValue('name', productItem.name);
         setValue('price', productItem.price);
         setValue('brand', productItem.brand);
         setValue('category', productItem.category);
         setValue('countInStock', productItem.countInStock);
         setValue('description', productItem.description);
      }
   }, [productItem, setValue]);

   async function onEditHandle(values) {
      const formData = new FormData();
      const fields = Object.keys(values);
      fields.forEach((el) => {
         if (el === 'image' && values[el].length > 0) {
            formData.append('image', values[el][0]);
         }
         if (el !== 'image') formData.append(el, values[el]);
      });
      if (!productItem) {
         run(create({ formData }));
      } else {
         run(update({ formData }));
      }
   }

   if (isLoading)
      return (
         <Row>
            <Spinner modifiers='dark' />
         </Row>
      );
   if (isSuccess) return <Redirect to='/products' />;

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
                  <Button>{!productItem ? 'Create' : 'Update'}</Button>
               </Form>
            </FormContainer>
         </Col>
      </Row>
   );
};

export default ProductEdit;

// {{pathname: '/signup', state: { prevPath: location.pathname }}}
