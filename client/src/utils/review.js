import { useQuery, useQueryClient, useMutation } from 'react-query';
import useAuth from '../stores/auth/authContext';
import axios from 'axios';

function useReviewItems(productId) {
	const result = useQuery({
		queryKey: ['review-items', { productId }],
		queryFn: () =>
			axios
				.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/products/${productId}/reviews`)
				.then(({ data: { data } }) => data.reviews)
				.catch(({ response: { data } }) => {
					throw data;
				})
	});
	return { ...result, reviews: result.data };
}

function useReviewItem(productId) {
	const [{ user }] = useAuth();
	const { reviews } = useReviewItems(productId);
	return user ? reviews?.find((el) => el.user._id === user._id) : null;
}

function useCreateReview(productId) {
	const queryClient = useQueryClient();
	const mutation = useMutation(
		({ rating, review }) =>
			axios.post(
				`${process.env.REACT_APP_BACKEND_URL}/api/v1/products/${productId}/reviews`,
				{ rating, review }
				// {
				// 	withCredentials: true
				// }
			),
		{
			onSettled: () => {
				queryClient.invalidateQueries(['review-items', { productId }]);
			}
		}
	);
	return { ...mutation, createReview: mutation.mutate };
}

export { useReviewItems, useReviewItem, useCreateReview };
