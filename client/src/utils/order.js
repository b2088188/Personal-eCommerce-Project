import { useQuery, useQueryClient, useMutation } from 'react-query';
import useAuth from '../stores/auth/authContext';
import axios from 'axios';

function useDefaultMutationOptions(orderId) {
	const queryClient = useQueryClient();
	return {
		onSettled: () => {
			queryClient.invalidateQueries('orderInfo', { orderId });
		}
	};
}

function useOrderInfo(orderId) {
	const result = useQuery({
		queryKey: ['orderInfo', { orderId }],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/orders/${orderId}`, {
					// withCredentials: true
				})
				.then(({ data: { data } }) => data.order)
				.catch(({ response: { data } }) => {
					throw data;
				})
	});
	return { ...result, order: result.data };
}

function useCreateOrder() {
	const [{ user }] = useAuth();
	const queryClient = useQueryClient();
	const mutation = useMutation((values) =>
		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${user?._id}/orders`, values, {
				//withCredentials: true
			})
			.then(({ data: { data } }) => data.order)
			.catch(({ response: { data } }) => {
				throw data;
			})
	);
	return { ...mutation, createOrder: mutation.mutate, order: mutation.data };
}

function useUpdateOrderToPaid(orderId) {
	const queryClient = useQueryClient();
	const mutation = useMutation(
		(values) =>
			axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/orders/${orderId}/pay`, values, {
				// withCredentials: true
			}),
		{
			...useDefaultMutationOptions(orderId)
		}
	);
	return { ...mutation, updateToPaid: mutation.mutate };
}

export { useOrderInfo, useCreateOrder, useUpdateOrderToPaid };

// const updateOrderToDeliver = useCallback(
//    async function (orderId) {
//       const { status } = await fetchOrder(
//          axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/orders/${orderId}/deliver`, {
//             // withCredentials: true
//          })
//       );
//       if (status === 'success')
//          dispatchOrder({
//             type: UPDATE_ORDER
//          });
//    },
//    [fetchOrder, dispatchOrder]
// );

// const getAllOrders = useCallback(
//    async function () {
//       const { status } = await fetchAllOrders(
//          axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/orders/admin`, {
//             //    withCredentials: true
//          })
//       );
//       if (status === 'success') dispatchAllOrders({ type: GET_ORDERLIST });
//    },
//    [fetchAllOrders, dispatchAllOrders]
// );
