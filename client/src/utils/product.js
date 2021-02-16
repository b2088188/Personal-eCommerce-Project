import * as R from 'ramda';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { queryClient } from 'context';
import { productRequest } from 'apis/backend';

function useProductItems(category) {
   const params = category
      ? {
           category
        }
      : null;
   const result = useQuery({
      queryKey: ['product-items', { category }],
      queryFn: () =>
         productRequest({
            method: 'GET',
            params
         })
            .then(({ data: { data } }) => data.products)
            .catch(({ response: { data } }) => {
               throw data;
            }),
      onSuccess: (products) => {
         //Once getting the product items, insert all results into the product info query
         products.forEach((product) => {
            setQueryDataForProductInfo(product);
         });
      }
   });
   const { data } = result;
   return { ...result, products: data ?? [] };
}

function useProductSearchItems(q, sort) {
   const result = useQuery({
      queryKey: ['search-items', { q, sort }],
      queryFn: () =>
         productRequest({
            method: 'GET',
            params: {
               q,
               sort
            }
         })
            .then(({ data: { data } }) => data.products)
            .catch(({ response: { data } }) => {
               throw data;
            }),
      onSuccess: (products) => {
         //Once getting the search items, insert all results into the product info query
         products.forEach((product) => {
            setQueryDataForProductInfo(product);
         });
      }
   });
   return { ...result, products: result.data ?? [] };
}

function useProductItem(productId) {
   const { products } = useProductItems();
   return products?.find((el) => el._id === productId) || null;
}

function useProductInfo(productId) {
   const result = useQuery({
      queryKey: ['productInfo', { productId }],
      queryFn: () =>
         productRequest
            .get(`/${productId}`)
            .then(({ data: { data } }) => data.product)
            .catch(({ response: { data } }) => {
               throw data;
            })
   });
   return { ...result, product: result.data };
}

function useDefaultMutation() {
   const queryClient = useQueryClient();
   return {
      onSettled: () => {
         queryClient.invalidateQueries(['product-items', {}]);
      }
   };
}

function useCreateProduct() {
   const mutation = useMutation(
      ({ formData }) =>
         productRequest.post('/', formData).catch(({ response: { data } }) => {
            throw data;
         }),
      {
         ...useDefaultMutation()
      }
   );
   return { ...mutation, create: mutation.mutateAsync };
}

function useUpdateProduct(productId) {
   const mutation = useMutation(
      ({ formData }) =>
         productRequest.patch(`/${productId}`, formData).catch(({ response: { data } }) => {
            throw data;
         }),
      {
         ...useDefaultMutation()
      }
   );
   return { ...mutation, update: mutation.mutateAsync };
}

function useRemoveProduct(productId) {
   const queryClient = useQueryClient();
   const mutation = useMutation(() => productRequest.delete(`/${productId}`), {
      ...useDefaultMutation(),
      onMutate: () => {
         queryClient.setQueryData(['product-items', {}], (oldData) => {
            return R.reject((el) => el._id === productId, oldData);
         });
      }
   });
   return { ...mutation, remove: mutation.mutate };
}

function setQueryDataForProductInfo(product) {
   queryClient.setQueryData(['productInfo', { productId: product._id }], product);
}

export {
   useProductItems,
   useProductItem,
   useProductInfo,
   useProductSearchItems,
   useCreateProduct,
   useUpdateProduct,
   useRemoveProduct
};
