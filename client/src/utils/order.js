import { useQuery, useQueryClient, useMutation } from 'react-query';
import { orderRequest } from 'apis/backend';

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
			orderRequest
				.get('/admin')
				.then(({ data: { data } }) => data.orders)
				.catch(({ response: { data } }) => {
					throw data;
				})
	});
	return { ...result, orders: result.data ?? [] };
}

function useOrderInfo(orderId) {
	const result = useQuery({
		queryKey: ['orderInfo', { orderId }],
		queryFn: () =>
			orderRequest
				.get(`/${orderId}`)
				.then(({ data: { data } }) => data.order)
				.catch(({ response: { data } }) => {
					throw data;
				})
	});
	return { ...result, order: result.data };
}

function useCreateOrder() {
	const mutation = useMutation((values) =>
		orderRequest
			.post('/', values)
			.then(({ data: { data } }) => data.order)
			.catch(({ response: { data } }) => {
				throw data;
			})
	);
	return { ...mutation, createOrder: mutation.mutate, order: mutation.data };
}

function useUpdateOrderToPaid(orderId) {
	const mutation = useMutation((values) => orderRequest.patch(`/${orderId}/pay`, values), {
		...useDefaultMutationOptions(orderId)
	});
	return { ...mutation, updateToPaid: mutation.mutate };
}

function useUpdateOrderToDeliver(orderId) {
	const mutation = useMutation(() => orderRequest.patch(`/${orderId}/deliver`), {
		...useDefaultMutationOptions(orderId)
	});
	return { ...mutation, updateToDeliver: mutation.mutate };
}

export {
	useOrderItems,
	useOrderInfo,
	useCreateOrder,
	useUpdateOrderToPaid,
	useUpdateOrderToDeliver
};
