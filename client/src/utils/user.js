import { useQuery, useQueryClient, useMutation } from 'react-query';
import useAuth from 'context/auth/authContext';
import axios from 'axios';

function useUserProfile() {
   const [{ user }] = useAuth();
   const result = useQuery({
      queryKey: ['userProfile', { userId: user._id }],
      queryFn: () =>
         axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/profile`, {
               //withCredentials: true
            })
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
         axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${userId}/orders`, {
               //withCredentials: true
            })
            .then(({ data: { data } }) => data.orders)
            .catch(({ response: { data } }) => {
               throw data;
            })
   });
   return { ...result, orders: result.data };
}

function useUpdateUserData() {
   const [{ user }] = useAuth();
   const queryClient = useQueryClient();
   const mutation = useMutation(
      (values) => axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/profile`, values),
      {
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
         //The recover argument will be the thing that we return from onMutate function
         onError: (err, variables, recover) => {
            // If has an error, then restore the userProfile to previous state
            if (typeof recover === 'function') recover();
         }
      }
   );
   return { ...mutation, updateUserData: mutation.mutate };
}

export { useUserProfile, useUpdateUserData, useUserOrders };
