import { useQuery, useQueryClient, useMutation } from 'react-query';
import useAuth from 'context/auth/authContext';
import { reviewRequest } from 'apis/backend';

function useReviewItems(productId) {
	const result = useQuery({
		queryKey: ['review-items', { productId }],
		queryFn: () =>
			reviewRequest(productId)
				.get('/')
				.then(({ data: { data } }) => data.reviews)
				.catch(({ response: { data } }) => {
					throw data;
				})
	});
	return { ...result, reviews: result.data ?? [] };
}

function useReviewItem(productId) {
	const [{ user }] = useAuth();
	const { reviews } = useReviewItems(productId);
	if (!user) return null;
	return reviews?.find((el) => el.user._id === user._id) || null;
}

function useDefaultMutationOptions(productId) {
	const queryClient = useQueryClient();
	return {
		onSettled: () => {
			queryClient.invalidateQueries(['review-items', { productId }]);
		}
	};
}

function useCreateReview(productId) {
	const mutation = useMutation(
		({ rating, review }) => reviewRequest(productId).post('/', { rating, review }),
		{
			...useDefaultMutationOptions(productId)
		}
	);
	return { ...mutation, createReview: mutation.mutate };
}

export { useReviewItems, useReviewItem, useCreateReview };
