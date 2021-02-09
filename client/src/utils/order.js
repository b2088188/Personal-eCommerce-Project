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

function useOrderItems() {
	const result = useQuery({
		queryKey: 'order-items',
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/orders/admin`, {
					//    withCredentials: true
				})
				.then(({ data: { data } }) => data.orders)
				.catch(({ response: { data } }) => {
					throw data;
				})
	});
	return { ...result, orders: result.data };
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

function useUpdateOrderToDeliver(orderId) {
	const queryClient = useQueryClient();
	const mutation = useMutation(
		() =>
			axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/orders/${orderId}/deliver`, {
				// withCredentials: true
			}),
		{
			...useDefaultMutationOptions(orderId)
		}
	);
	return { ...mutation, updateToDeliver: mutation.mutate };
}

export {
	useOrderItems,
	useOrderInfo,
	useCreateOrder,
	useUpdateOrderToPaid,
	useUpdateOrderToDeliver
};
