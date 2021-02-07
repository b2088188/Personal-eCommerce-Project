import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
function useProductItems(category) {
   const queryClient = useQueryClient();
   const result = useQuery({
      queryKey: ['product-items', { category }],
      queryFn: () =>
         axios({
            method: 'GET',
            baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/products`,
            params: {
               category

               // limit: 8
            }
         })
            .then(({ data: { data } }) => data.products)
            .catch(({ response: { data } }) => {
               throw data;
            }),
      onSuccess: (products) => {
         //Once getting the product items, insert all results into the product info query
         products.forEach((product) => {
            queryClient.setQueryData(['productInfo', { productId: product._id }], product);
         });
      }
   });
   const { data } = result;
   return { ...result, products: data };
}

function useProductSearchItems(q, sort) {
   const queryClient = useQueryClient();
   const result = useQuery({
      queryKey: ['search-items', { q, sort }],
      queryFn: () =>
         axios({
            method: 'GET',
            baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1/products`,
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
            queryClient.setQueryData(['productInfo', { productId: product._id }], product);
         });
      }
   });
   return { ...result, products: result.data };
}

function useProductInfo(productId) {
   const result = useQuery({
      queryKey: ['productInfo', { productId }],
      queryFn: () =>
         axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/products/${productId}`)
            .then(({ data: { data } }) => data.product)
            .catch(({ response: { data } }) => {
               throw data;
            })
   });
   return { ...result, product: result.data };
}

export { useProductItems, useProductInfo, useProductSearchItems };
