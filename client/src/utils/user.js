import { useQuery, useQueryClient, useMutation } from 'react-query';
import useAuth from 'context/auth/authContext';
import { authRequest } from 'apis/backend';

function useUserProfile() {
   const [{ user }] = useAuth();
   const result = useQuery({
      queryKey: ['userProfile', { userId: user._id }],
      queryFn: () =>
         authRequest
            .get('/profile')
            .then(({ data: { data } }) => data.user)
            .catch(({ response: { data } }) => {
               throw data;
            })
   });
   return { ...result, userProfile: result.data };
}

function useUserOrders() {
   const [{ user }] = useAuth();
   const userId = user._id;
   const result = useQuery({
      queryKey: ['userOrders', { userId }],
      queryFn: () =>
         authRequest
            .get(`/${userId}/orders`)
            .then(({ data: { data } }) => data.orders)
            .catch(({ response: { data } }) => {
               throw data;
            })
   });
   return { ...result, orders: result.data };
}

function useUpdateUserData() {
   const [{ user }, { setData }] = useAuth();
   const queryClient = useQueryClient();
   const mutation = useMutation((values) => authRequest.patch('/profile', values), {
      onSettled: () => {
         //queries(userProfile cache) get invalidated and refetched after success or fail
         queryClient.invalidateQueries(['userProfile', { userId: user._id }]);
      },
      //This will fire before mutate function, and receiving same arguments mutate function received.
      onMutate: (values) => {
         const prevUserProfile = queryClient.getQueryData(['userProfile', { userId: user._id }]);
         // we just assume the server will do, and do the same thing before server finished
         queryClient.setQueryData(['userProfile', { userId: user._id }], (oldData) => {
            return {
               ...oldData,
               ...values
            };
         });
         // The value return from onMutate will be the third argument that onError receives
         return () =>
            queryClient.setQueryData(['userProfile', { userId: user._id }], prevUserProfile);
      },
      onSuccess: ({ data: { data } }) => {
         setData(data.user);
      },
      //The recover argument will be the thing that we return from onMutate function
      onError: (err, variables, recover) => {
         // If has an error, then restore the userProfile to previous state
         if (typeof recover === 'function') recover();
      }
   });
   return { ...mutation, updateUserData: mutation.mutateAsync };
}

export { useUserProfile, useUpdateUserData, useUserOrders };
